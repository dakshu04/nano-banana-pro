import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";

import { Plan } from "@prisma/client"; // Import the Enum we defined in schema
import { prisma } from "../../../../lib/prisma";

const webhookSecret = process.env.DODOPAYMENTS_WEBHOOK_SECRET!;

// Define credits per plan/pack mapping
// Keys must match the Plan Enum exactly
const CREDITS_PER_PLAN: Record<Plan, number> = {
  FREE: 0,
  CREATOR: 20,
  PREMIUM: 60,
  PRO: 100
};

export async function POST(req: NextRequest) {
  console.log("🔔 WEBHOOK HIT: Request received.");

  try {
    // 1. VALIDATE HEADERS
    const webhookId = req.headers.get("webhook-id");
    const webhookSignature = req.headers.get("webhook-signature");
    const webhookTimestamp = req.headers.get("webhook-timestamp");

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      return NextResponse.json({ error: "Missing headers" }, { status: 400 });
    }

    // 2. VERIFY SIGNATURE
    const body = await req.text();
    const webhook = new Webhook(webhookSecret);

    try {
      await webhook.verify(body, {
        "webhook-id": webhookId,
        "webhook-signature": webhookSignature,
        "webhook-timestamp": webhookTimestamp,
      });
    } catch (err) {
      console.error("❌ SIGNATURE VERIFICATION FAILED:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 3. PROCESS EVENT
    const payload = JSON.parse(body);
    const { type, data } = payload;

    console.log(`✅ Event Type: ${type}`);

    switch (type) {
      case "payment.succeeded":
      case "subscription.created":
        // 4. EXTRACT METADATA
        // We expect { userId: "user_...", plan: "PRO" }
        const { userId, plan } = data.metadata || {};

        if (!userId || !plan) {
          console.error("❌ Metadata missing userId or plan");
          return NextResponse.json({ error: "Metadata missing" }, { status: 400 });
        }

        // 5. VALIDATE PLAN ENUM
        // Cast the string from metadata to our Prisma Enum
        const planEnum = Plan[plan as keyof typeof Plan]; 
        
        if (!planEnum) {
          console.error(`❌ Invalid plan received: ${plan}`);
          return NextResponse.json({ error: "Invalid Plan" }, { status: 400 });
        }

        // 6. GET CREDITS AMOUNT
        const creditsToAdd = CREDITS_PER_PLAN[planEnum] || 0;

        console.log(`👤 Processing for User: ${userId} | Plan: ${planEnum} | Credits: +${creditsToAdd}`);

        // 7. UPDATE DATABASE
        // We use 'plan' (Enum) and 'credits' (Int) as per your schema
        try {
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: planEnum, // Sets the Enum (CREATOR, PRO, etc.)
              subscriptionId: data.subscription_id || data.payment_id,
              credits: {
                increment: creditsToAdd // Adds to existing balance
              },
            },
          });
          console.log(`🎉 DB Updated Successfully for ${userId}`);
        } catch (dbError) {
          console.error("❌ DB Update Failed:", dbError.message);
          // If user not found, they might need to sign in first
          if (dbError.code === 'P2025') {
             console.error("👉 User ID not found in DB. They must log in once before buying.");
          }
          return NextResponse.json({ error: "DB Update Failed" }, { status: 500 });
        }
        break;

      case "subscription.cancelled":
      case "subscription.failed":
        const cancelledUserId = data.metadata?.userId;
        if (cancelledUserId) {
          console.log(`⚠️ Downgrading user ${cancelledUserId}`);
          await prisma.user.updateMany({
            where: { id: cancelledUserId },
            data: { plan: Plan.FREE } // Revert to FREE
          });
        }
        break;
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error.message);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}