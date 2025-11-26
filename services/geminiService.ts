import { GoogleGenAI } from "@google/genai";

// Safely access process.env to avoid ReferenceError in browser
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "C-Tech", the holographic AI sales assistant for CreartTech, a futuristic cyberpunk e-commerce store.
Your tone is robotic but helpful, using slang like "Netrunner", "Choom", "Preem", and "Nova".
You are an expert in high-end computer hardware and futuristic tech.
Keep answers concise (under 50 words unless technical detail is requested).
If asked about products, recommend items based on the user's needs (Gaming, Work, AI development).
Do not handle payments.
`;

export const generateTechAdvice = async (userQuery: string): Promise<string> => {
  if (!apiKey) return "SYSTEM ERROR: API_KEY_MISSING. Please configure your neural link.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Transmission interrupted. Please retry.";
  } catch (error) {
    console.error("Neural link failure:", error);
    return "Error: Connection to mainframe lost.";
  }
};