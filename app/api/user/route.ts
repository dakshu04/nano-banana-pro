import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Check Authentication
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Fetch user details from Clerk
    // FIXED: Removed "await" and function call () on clerkClient
    // If this line fails, your Clerk API keys might be missing in .env
    const userDetails = await (await clerkClient()).users.getUser(userId);
    
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
        }
      });
      console.log("✅ User created successfully!");
    }

    // 4. Return success
    return NextResponse.json({
      id: user.id,
      email: user.email,
      credits: user.credits,
      isPro: user.isPro,
      createdAt: user.createdAt,
    });

  } catch (error) {
    // 5. CATCH ERRORS
    // This will print the REAL error to your VS Code terminal
    console.error("❌ API ERROR:", error);
    
    // This sends the error details to the frontend so you can see it there too
    return NextResponse.json(
        { error: error.message || "Internal Server Error" }, 
        { status: 500 }
    );
  }
}