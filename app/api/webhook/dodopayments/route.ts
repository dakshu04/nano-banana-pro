import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "standardwebhooks";
import { prisma } from "../../../../lib/prisma";
import { Plan } from "@prisma/client";


const webhookSecret = process.env.DODOPAYMENTS_WEBHOOK_SECRET!;

// Optional: Define credits per plan here for easy updating
const CREDITS_PER_PLAN = {
  CREATOR: 20,
  PREMIUM: 60,
  PRO: 100,
  FREE: 0
};

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Webhook (Standard Security)
    const webhookId = req.headers.get("webhook-id");
    const webhookSignature = req.headers.get("webhook-signature");
    const webhookTimestamp = req.headers.get("webhook-timestamp");

    if (!webhookId || !webhookSignature || !webhookTimestamp) {
      return NextResponse.json({ error: "Missing headers" }, { status: 400 });
    }

    const body = await req.text();
    const webhook = new Webhook(webhookSecret);

    try {
      await webhook.verify(body, {
        "webhook-id": webhookId,
        "webhook-signature": webhookSignature,
        "webhook-timestamp": webhookTimestamp,
      });
    } catch (err) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 2. Parse Payload
    const payload = JSON.parse(body);
    const data = payload.data;
    const type = payload.type;
    
    console.log(`Webhook Event: ${type}`);

    // 3. Handle Events
    switch (type) {
      case "payment.succeeded":
      case "subscription.created": // Dodo sometimes uses this for first sub event
        
        // Extract Metadata we sent in the Checkout API
        const { userId, plan } = data.metadata || {};

        if (!userId || !plan) {
          console.error("Missing metadata (userId or plan)");
          break;
        }

        // Validate that the plan string matches our Enum
        const planEnum = Plan[plan as keyof typeof Plan]; // e.g. "CREATOR" -> Plan.CREATOR
        if (!planEnum) {
            console.error(`Invalid plan type received: ${plan}`);
            break;
        }

        // Calculate credits to add (Optional)
        const creditsToAdd = CREDITS_PER_PLAN[plan as keyof typeof CREDITS_PER_PLAN] || 0;

        // UPDATE DATABASE
        await prisma.user.update({
          where: { id: userId }, // 'id' matches the Clerk User ID in your schema
          data: {
            plan: planEnum,
            subscriptionId: data.subscription_id || null, // specific to Dodo sub ID
            credits: { increment: creditsToAdd } // Adds new credits to existing balance
          }
        });

        console.log(`Success: User ${userId} upgraded to ${planEnum} with ${creditsToAdd} credits.`);
        break;

      case "subscription.cancelled":
      case "subscription.failed":
        const cancelledUserId = data.metadata?.userId;
        
        if (cancelledUserId) {
          // Downgrade user to FREE
          await prisma.user.update({
            where: { id: cancelledUserId },
            data: { 
                plan: Plan.FREE,
                // Do NOT reset credits usually, let them keep what they bought? 
                // Or set credits: 0 if you want.
            }
          });
          console.log(`User ${cancelledUserId} downgraded to FREE.`);
        }
        break;

      default:
        console.log("Unhandled event:", type);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}