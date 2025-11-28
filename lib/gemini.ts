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
            "Return a realistic, clean PNG. Do not distort body or background.",
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



