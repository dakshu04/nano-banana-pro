
import { generateScript } from "lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. DEFINE DURATION LOGIC
    // We transform the simple "short/medium/long" tag into specific instructions 
    // that your generateScript prompt will insert into the "Duration" slot.
    let detailedDurationInstruction = body.duration;

    if (body.duration === "short") {
      detailedDurationInstruction = "Under 60 seconds. STRICT LIMIT: Maximum 150 words. Focus on a quick hook and immediate value.";
    } else if (body.duration === "medium") {
      detailedDurationInstruction = "2 to 5 minutes. Target approx 600-800 words. Cover 3 distinct main points with clear explanations.";
    } else if (body.duration === "long") {
      detailedDurationInstruction = "10+ minutes. Deep Dive. Minimum 1500 words. Comprehensive analysis with examples, context, and a detailed breakdown of the topic.";
    }

    // 2. CALL YOUR EXISTING FUNCTION
    // We pass the detailed string into the 'duration' field so your prompt receives the full context.
    const data = await generateScript({
      topic: body.topic,
      platform: body.platform,
      genre: body.genre,
      audience: body.targetAudience, // Maps to 'audience' in your interface
      tone: body.tone,
      duration: detailedDurationInstruction, // <-- Passing the detailed instructions here
      additionalInfo: body.additionalInfo,
    });

    console.log("Generated Script Length:", data.length);
    
    return NextResponse.json({ data });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate script." }, 
      { status: 500 }
    );
  }
}