import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY! // Add '!' to ensure TS knows it exists
});

// 1. Define the return type as Promise<string>
export async function textToImage(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image", // or "gemini-3-pro-image-preview"
      contents: prompt,
      config: {
        responseModalities: ["IMAGE"],
      }
    });

    const candidate = response.candidates?.[0];

    // 2. Check specifically for inlineData (the image)
    if (candidate?.content?.parts?.[0]?.inlineData) {
      const base64String = candidate.content.parts[0].inlineData.data;
      
      // 3. THIS IS THE MISSING PART: Return the data!
      return base64String; 
    }

    throw new Error("No image data found in Gemini response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate image");
  }
}