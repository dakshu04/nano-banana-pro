import { generateScript } from "lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await generateScript({
            topic: body.topic,
            platform: body.platform,
            genre: body.genre,
            audience: body.targetAudience, // Note: matching your frontend key
            tone: body.tone,
            duration: body.duration,
            additionalInfo: body.additionalInfo
            });
            console.log("Generated Script:2", data);
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({
            error: "Failed to generate script."
        }, {
            status: 500
        })
    }
}