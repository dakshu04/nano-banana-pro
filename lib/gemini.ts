import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({})

export async function textToImage(
  prompt: string
) {
  const text = prompt;
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: text
  }) 
  console.log(response)
   for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;   // <-- BASE64 STRING
    }
  }

  throw new Error("No image returned from model");
}

export async function faceSwap(sourceBase64: string, targetBase64: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [
        {
          text:
            "Swap the face from the first image onto the person in the second image. " +
            "Return a realistic, clean PNG. Do not distort body or background. And also maintain the targetBase64 aspect ratio. I want my final image in the same aspect ratio that targetBase64 has. And also maintain the facial structure and make it very clear and real.",
        },
        {
          inlineData: {
            mimeType: "image/png",
            data: sourceBase64,
          },
        },
        {
          inlineData: {
            mimeType: "image/png",
            data: targetBase64,
          },
        },
      ],
    });

    
    for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;   // <-- BASE64 STRING
    }
  }

  } catch (err) {
    console.error("faceSwap Gemini error:", err);
    return null;
  }
}

interface ScriptInput {
  topic: string;
  platform: string;
  genre: string;
  audience: string;
  tone: string;
  duration: string;
  additionalInfo?: string;
}

export async function generateScript(input: ScriptInput) {
  try {
    const prompt = `
    ROLE:
    You are a world-class viral content creator for ${input.platform}. Your writing style is conversational, simple, and highly engaging.

    INPUT DATA:
    - Topic: ${input.topic}
    - Target Audience: ${input.audience}
    - Genre: ${input.genre}
    - Tone: ${input.tone}
    - Duration: ${input.duration || "Optimized for platform and audience"}
    - Context: ${input.additionalInfo || "None"}

    STRICT WRITING RULES:
    1. SIMPLE LANGUAGE: 
       - Write at a 5th-grade reading level. 
       - Use short words. Avoid jargon. Write exactly how people speak in real life.
       - Make it as detailed as possible within the duration ${input.duration}.
       - No complex sentence structures. Keep it punchy.

    2. THE STRUCTURE:
       - HOOK (First sentence): Must be a scroll-stopper. Ask a shocking question or state a controversial fact. No "Hello" or "Welcome".
       - BODY: Deliver high value or tell the story immediately. Focus on the "You" perspective.
       - CTA: End with one clear instruction.

    3. PURE SPOKEN TEXT ONLY:
       - Do NOT include scene descriptions (e.g., [Visual: ...]).
       - Do NOT include stage directions (e.g., *laughs*).
       - Do NOT include speaker labels (e.g., Narrator:).
       - Do NOT use Markdown (no **bold** or # headers).
       
    Output ONLY the words that needs to be spoken/read, nothing else.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: prompt
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error("No text returned from model");
    }
    
    return text;
    
  } catch (error) {
    console.error("Script generation error:", error);
    throw new Error("Failed to generate script");
  }
}




