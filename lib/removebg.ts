import { GoogleGenAI } from "@google/genai";

export async function removeBg(imageBase64: string) {
    
    const ai = new GoogleGenAI({});
     const prompt = [
    { text: "Remove background completely. Return only the subject as a transparent PNG." },
    {
      inlineData: {
        mimeType: "image/png",
        data: imageBase64,
      },
    },
  ];
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];

  for (const part of parts) {
    if (part.inlineData?.data) {
      return part.inlineData.data;
    }
  }

  throw new Error("No output image returned from Gemini");
}
