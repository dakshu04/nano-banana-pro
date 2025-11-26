import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { uploadToSupabase } from "../../../lib/uploadToSupabase";
import { prisma } from "../../../lib/prisma";
import TextToImage from "../../components/text-to-image/page";



export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { prompt } = await req.json();

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // 1️⃣ Generate image using Gemini
    const base64 = await TextToImage(prompt);

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
