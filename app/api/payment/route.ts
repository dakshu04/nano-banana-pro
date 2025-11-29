// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import DodoPayments from "dodopayments";

// // Initialize Dodo
// const dodo = new DodoPayments({
//   bearerToken: process.env.DODO_PAYMENTS_API_KEY, 
//   environment: 'test_mode', // Change to 'live_mode' for production
// });

// // Map your Product IDs to Credit Amounts
// const CREDIT_PACKAGES: Record<string, number> = {
//   "pdt_creator_id": 20,   // Replace with your REAL Dodo Product IDs
//   "pdt_premium_id": 60,
//   "pdt_pro_id": 100
// };

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { productId } = await req.json();

//     // 1. Determine how many credits this product is worth
//     const creditsToGive = CREDIT_PACKAGES[productId];

//     if (!creditsToGive) {
//       return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
//     }

//     // 2. Create the Payment Link
//     const payment = await dodo.payments.create({
//       billing_country: "US", 
//       customer: {
//         email: user.emailAddresses[0].emailAddress,
//         name: `${user.firstName} ${user.lastName}`,
//       },
//       product_cart: [
//         {
//           product_id: productId,
//           quantity: 1,
//         },
//       ],
//       // CRITICAL: We attach the userId and credits here.
//       // Dodo will send this back to us in the Webhook.
//       metadata: {
//         userId: userId,
//         credits: creditsToGive.toString() // Metadata is usually string-only
//       },
//       return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?payment=success`,
//     });

//     return NextResponse.json({ url: payment.payment_link });

//   } catch (error) {
//     console.error("Dodo Init Error:", error);
//     return NextResponse.json(
//       { error: "Failed to create checkout session" },
//       { status: 500 }
//     );
//   }
// }