// import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma"; // Adjust this path to your prisma client
// import crypto from "crypto";

// export async function POST(req: Request) {
//   try {
//     // 1. Get Raw Body (Required for signature verification)
//     const rawBody = await req.text();
    
//     // 2. Get Headers
//     const signature = req.headers.get("x-webhook-signature");
//     const secret = process.env.DODO_WEBHOOK_SECRET;

//     if (!signature || !secret) {
//       return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
//     }

//     // 3. Verify Signature (HMAC-SHA256)
//     // This ensures the request is actually from Dodo and not a hacker
//     const computedSignature = crypto
//       .createHmac("sha256", secret)
//       .update(rawBody)
//       .digest("hex");

//     // Note: Dodo might use a specific prefix like "t=..." in the header. 
//     // Check Dodo docs if simple comparison fails. Usually simple comparison works.
//     if (signature !== computedSignature) {
//       console.error("⚠️ Invalid Webhook Signature");
//       return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
//     }

//     // 4. Parse the Event
//     const event = JSON.parse(rawBody);

//     // 5. Handle "Payment Succeeded"
//     // Dodo event type for successful payment
//     if (event.type === "payment.succeeded") {
//       const { metadata, status } = event.data;

//       // Only proceed if status is actually 'paid' or 'succeeded'
//       if (status === "succeeded" || status === "paid") {
          
//         const userId = metadata?.userId;
//         const credits = Number(metadata?.credits);

//         if (userId && credits) {
//             // --- DATABASE UPDATE ---
//             await prisma.user.update({
//                 where: { id: userId },
//                 data: {
//                     credits: { increment: credits } 
//                 }
//             });
//             console.log(`✅ Webhook: Added ${credits} credits to user ${userId}`);
//         } else {
//             console.error("⚠️ Webhook received but metadata missing (userId or credits)");
//         }
//       }
//     }

//     // 6. Acknowledge Receipt
//     return NextResponse.json({ received: true }, { status: 200 });

//   } catch (error) {
//     console.error("❌ Webhook Error:", error);
//     return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
//   }
// }