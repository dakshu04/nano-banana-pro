import { currentUser, auth } from "@clerk/nextjs/server";
import DodoPayments from "dodopayments";
import { NextRequest, NextResponse } from "next/server";

const dodopayments = new DodoPayments({
  environment: 'test_mode', 
  bearerToken: process.env.DODO_API_KEY!
});

export async function POST(req: NextRequest) {
  try {
    console.log("MY API KEY IS:", process.env.DODO_API_KEY ? "Loaded ✅" : "Missing ❌");
    // 1. Auth Check
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Get Product Details from Frontend
    // You should send { productId: "pdt_...", plan: "CREATOR" } from your frontend button
    const { productId, plan } = await req.json();

    if (!productId || !plan) {
      return NextResponse.json({ message: "Product ID and Plan are required" }, { status: 400 });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const name = user.fullName || "Guest";

    // 3. Create Checkout Session
    const checkout = await dodopayments.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId, // Dynamic Product ID based on what user clicked
          quantity: 1
        }
      ],
      customer: {
        name: name,
        email: email
      },
      // 4. CRITICAL: Pass the "plan" string to metadata so the webhook knows what to give them
      metadata: {
        userId: userId,
        email: email,
        plan: plan // e.g., "CREATOR", "PREMIUM", or "PRO"
      },
      return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard` 
    });
    console.log("--------checkout created----------")
    return NextResponse.json({
      message: "Checkout created",
      url: checkout.checkout_url
    });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}