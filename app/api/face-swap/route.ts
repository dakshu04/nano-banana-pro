import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { faceSwap } from "../../../lib/gemini";
import { prisma } from "../../../lib/prisma";
import { uploadToSupabase } from "../../../lib/uploadToSupabase";


export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { source, target } = await req.json();
    if (!source || !target) {
      return NextResponse.json(
        { error: "Both source and target images are required" },
        { status: 400 }
      );
    }

    const outputBase64 = await faceSwap(source, target);
    if (!outputBase64) {
      return NextResponse.json(
        { error: "Face swap failed" },
        { status: 500 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.credits <= 0) {
      return NextResponse.json(
        { error: "Not enough credits" },
        { status: 403 }
      );
    }


    // Deduct 1 credit
    await prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: 1 } }
    });

    const imageUrl = await uploadToSupabase(outputBase64);
    // Store in history
    await prisma.imageHistory.create({
        data: {
            userId,
            imageUrl,
            prompt: "face swaped image"
        }
    })

    return NextResponse.json({ image: outputBase64 });

  } catch (err) {
    console.error("FaceSwap API Error:", err);
    return NextResponse.json(
      { error: "Server error while swapping face" },
      { status: 500 }
    );
  }
}
