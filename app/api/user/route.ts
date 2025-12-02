import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    // 1. Check Authentication
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Fetch user details from Clerk
    const client = await clerkClient();
    const userDetails = await client.users.getUser(userId);
    
    // Safety check for email
    if (!userDetails.emailAddresses[0]) {
        return new NextResponse("User has no email", { status: 400 });
    }
    const email = userDetails.emailAddresses[0].emailAddress;

    // 3. Check/Create User in Database
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log("🆕 User not found in DB. Creating...");
      user = await prisma.user.create({
        data: {
          id: userId,
          email: email,
          plan: "FREE",
          credits: 0, // <--- 🟢 FIX: Give them 5 free credits on sign up!
        }
      });
  
    }

    // 4. Return success
    return NextResponse.json({
      id: user.id,
      email: user.email,
      credits: user.credits,
      plan: user.plan,
      createdAt: user.createdAt,
    });

  } catch (error) {
    
    
    return NextResponse.json(
        { error: error.message || "Internal Server Error" }, 
        { status: 500 }
    );
  }
}