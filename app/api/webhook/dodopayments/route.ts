import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { prisma } from "../../../../lib/prisma"; // Adjust if your path is different, e.g. "@/lib/prisma"
import { Plan } from "@prisma/client";

const webhookSecret = process.env.DODOPAYMENTS_WEBHOOK_SECRET!;

// Define credits per plan/pack
const CREDITS_PER_PLAN = {
  CREATOR: 20,
  PREMIUM: 60,
  PRO: 100,
  FREE: 0
};

export async function POST(req: NextRequest) {
  // 🔍 LOG 1: Entry Point - Did the request reach Vercel?
  console.log("🔔 WEBHOOK HIT: Request received at endpoint.");

  try {
    // --------------------------------------------------------
    // 1. VALIDATE HEADERS
    // --------------------------------------------------------
    const webhookId = req.headers.get("webhook-id");
    const webhookSignature = req.headers.get("webhook-signature");
    const webhookTimestamp = req.headers.get("webhook-timestamp");

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      console.error("❌ Missing required webhook headers.");
      return NextResponse.json({ error: "Missing headers" }, { status: 400 });
    }

    // --------------------------------------------------------
    // 2. VERIFY SIGNATURE (Crucial Step)
    // --------------------------------------------------------
    const body = await req.text();
    const webhook = new Webhook(webhookSecret);

    try {
      await webhook.verify(body, {
        "webhook-id": webhookId,
        "webhook-signature": webhookSignature,
        "webhook-timestamp": webhookTimestamp,
      });
    } catch (err) {
      // 🔍 LOG 2: Verification Failure
      console.error("❌ SIGNATURE VERIFICATION FAILED.");
      console.error("Error details:", err.message);
      
      // Debug Helper: Check if secrets match
      const secretHint = webhookSecret ? webhookSecret.substring(0, 5) + "..." : "UNDEFINED";
      console.log(`🔑 Vercel is using secret starting with: ${secretHint}`);
      console.log("👉 Ensure this matches the secret in Dodo Dashboard (Test vs Live).");
      
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // --------------------------------------------------------
    // 3. PROCESS LOGIC
    // --------------------------------------------------------
    const payload = JSON.parse(body);
    const data = payload.data;
    const type = payload.type;

    console.log(`✅ Signature Valid. Processing Event: ${type}`);

    switch (type) {
      case "payment.succeeded":
      case "subscription.created":
        console.log("💳 Processing Payment Success...");

        // Extract Metadata
        const { userId, plan } = data.metadata || {};

        if (!userId || !plan) {
          console.error("❌ Missing metadata (userId or plan) in payload.");
          break;
        }

        console.log(`👤 User ID: ${userId}, Plan: ${plan}`);

        // Validate Plan Enum
        const planEnum = Plan[plan as keyof typeof Plan];
        if (!planEnum) {
          console.error(`❌ Invalid plan type received: ${plan}`);
          break;
        }

        // Calculate credits
        const creditsToAdd = CREDITS_PER_PLAN[plan as keyof typeof CREDITS_PER_PLAN] || 0;

        // UPDATE DATABASE
        try {
          const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
              plan: planEnum, // Update the plan badge
              subscriptionId: data.subscription_id || data.payment_id || null,
              credits: { increment: creditsToAdd } // Add credits to existing balance
            }
          });
          console.log(`🎉 SUCCESS! Added ${creditsToAdd} credits. New Balance: ${updatedUser.credits}`);
        } catch (dbError) {
          console.error("❌ DATABASE ERROR: Could not update user.");
          console.error("Reason:", dbError.message);
          
          // Check for "Record Not Found" (Ghost User)
          if (dbError.code === 'P2025') {
             console.error("👉 CAUSE: The User ID does not exist in the Production Database. Please Sign In on the live site first.");
          }
          return NextResponse.json({ error: "DB Error" }, { status: 500 });
        }
        break;

      case "subscription.cancelled":
      case "subscription.failed":
        const cancelledUserId = data.metadata?.userId;
        if (cancelledUserId) {
          console.log(`⚠️ Subscription cancelled for ${cancelledUserId}`);
          try {
            await prisma.user.update({
                where: { id: cancelledUserId },
                data: { plan: Plan.FREE }
            });
          } catch (e) {
            console.error("Failed to downgrade user:", e);
          }
        }
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("❌ CRITICAL SERVER ERROR:", error.message);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}