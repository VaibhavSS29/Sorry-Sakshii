
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateApologyLetter = async (girlName: string, reason: string, angerLevel: number) => {
  // Returns exactly what the user provided as the core message
  return reason;
};

export const generateVirtualGift = async (promptText: string) => {
  const ai = getAI();
  // We specify a very cute, emotional baby chick (chuja) character design
  const prompt = `${promptText}. Extremely expressive eyes, soft yellow feathers, cute 3D Pixar movie style character, high quality lighting, aesthetic pink and pastel background, emotional and heartfelt vibe.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  return null;
};
