
import {
  generateScript,
  ScriptGenerationError,
  type ScriptDuration,
  type ScriptInput,
} from "lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_VALUES = {
  platform: new Set(["linkedin", "twitter", "youtube", "shorts"]),
  genre: new Set(["educational", "storytelling", "rant", "case-study"]),
  tone: new Set(["professional", "witty", "serious", "empathetic"]),
  duration: new Set<ScriptDuration>(["short", "medium", "long"]),
};

function readString(
  value: unknown,
  field: string,
  options: { required?: boolean; maxLength: number },
) {
  if (value === undefined || value === null) {
    if (options.required) throw new Error(`${field} is required.`);
    return "";
  }

  if (typeof value !== "string") throw new Error(`${field} must be text.`);
  const normalized = value.trim();
  if (options.required && !normalized) throw new Error(`${field} is required.`);
  if (normalized.length > options.maxLength) {
    throw new Error(`${field} must be ${options.maxLength} characters or fewer.`);
  }
  return normalized;
}

function parseRequestBody(body: unknown): ScriptInput {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new Error("The request body must be a JSON object.");
  }

  const input = body as Record<string, unknown>;
  const platform = readString(input.platform, "Platform", { required: true, maxLength: 20 });
  const genre = readString(input.genre, "Genre", { required: true, maxLength: 30 });
  const tone = readString(input.tone, "Tone", { required: true, maxLength: 30 });
  const duration = readString(input.duration, "Duration", { required: true, maxLength: 10 });

  if (!ALLOWED_VALUES.platform.has(platform)) throw new Error("Choose a supported platform.");
  if (!ALLOWED_VALUES.genre.has(genre)) throw new Error("Choose a supported genre.");
  if (!ALLOWED_VALUES.tone.has(tone)) throw new Error("Choose a supported tone.");
  if (!ALLOWED_VALUES.duration.has(duration as ScriptDuration)) throw new Error("Choose a supported duration.");

  return {
    topic: readString(input.topic, "Topic", { required: true, maxLength: 600 }),
    platform,
    genre,
    audience: readString(input.targetAudience, "Target audience", { maxLength: 240 }),
    tone,
    duration: duration as ScriptDuration,
    additionalInfo: readString(input.additionalInfo, "Context", { maxLength: 1_500 }),
  };
}

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Send a valid JSON request body." }, { status: 400 });
    }

    let input: ScriptInput;
    try {
      input = parseRequestBody(body);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Check the script details and try again.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const data = await generateScript(input);
    
    return NextResponse.json(
      { data },
      { headers: { "Cache-Control": "no-store" } },
    );

  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof ScriptGenerationError) {
      const status = error.code === "RATE_LIMIT"
        ? 429
        : error.code === "CONFIGURATION"
          ? 503
          : 502;

      return NextResponse.json({ error: error.message }, { status });
    }

    return NextResponse.json(
      { error: "Failed to generate script." },
      { status: 500 }
    );
  }
}
