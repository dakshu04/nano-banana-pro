import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { removeBg } from "../../../lib/removebg";


export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // image is already RAW base64
    const outputBase64 = await removeBg(image);

    return NextResponse.json({ image: outputBase64 });
  } catch (error) {
    console.error("Remove-BG API Error:", error);
    return NextResponse.json(
      { error: "Failed to remove background" },
      { status: 500 }
    );
  }
}
