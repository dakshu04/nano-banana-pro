import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { uploadToSupabase } from "../../../lib/uploadToSupabase";
import { prisma } from "../../../lib/prisma";
import { textToImage } from "../../../lib/gemini";



export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { prompt } = await req.json();

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if(user.credits < 0) {
      return NextResponse.json({
        error: "Not enough credits. Please upgrade your plan."
      }, {
        status: 403
      })
    }

    // 1️⃣ Generate image using Gemini
    const base64 = await textToImage(prompt);
    console.log(base64)
    // 2️⃣ Upload to Supabase and get URL
    const imageUrl = await uploadToSupabase(base64);

    // 3️⃣ Save to Neon DB
    await prisma.imageHistory.create({
        data: {
            userId,
            prompt,
            imageUrl
        }
    })

    // Deduct credits (-1)
    await prisma.user.update({
      where: {
        id: userId
      }, 
      data: {
        credits: {
          decrement: 1
        }
      }
    })

    // 4️⃣ Send to frontend
    return NextResponse.json({ imageUrl });

  } catch (err) {
    console.error("❌ Generation Error:", err);

    // Check if it is a Rate Limit error (429)
    if (err.message?.includes("429") || err.status === 429) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." }, 
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
