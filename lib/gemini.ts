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

// export async function removeBg(prompt: string, imageBase64: string) {
//   const response  = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: [
//       { text: prompt},
//       {
//         inlineData: {
//           data: imageBase64,
//           mimeType: "image/png"
//         }
//       }
//     ]
//   })

//    let resultText = "";
//   let resultImageBase64 = "";

//   for (const part of response.candidates[0].content.parts) {
//     // Extract text response
//     if (part.text) {
//       resultText += part.text;
//     }

//     // Extract image response
//     if (part.inlineData) {
//       resultImageBase64 = part.inlineData.data;
//     }
//   }

//   return {
//     text: resultText,
//     image: resultImageBase64
//   };
// }



