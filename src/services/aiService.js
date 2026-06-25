import { ai, GEMINI_MODEL } from '../config/gemini.js';

const systemInstructionText = "Kamu adalah asisten AI Senior dari Hacktiv8. Selalu jawab dengan profesional, jelas, ramah, dan gunakan format Markdown yang rapi untuk setiap penjelasanmu."
const systemInstructionMultimodal = "Kamu adalah analis data AI. Berikan analisis yang tajam dan akurat berdasarkan file yang diberikan."

export const generateTextService = async (model, prompt) => {
    console.log(`Menggunakan model: ${model || GEMINI_MODEL}`);
    console.log(`Prompt: ${prompt}`);
    console.log(`System Instruction: ${systemInstructionText}`);
    const response = await ai.models.generateContent({
        model: model || GEMINI_MODEL,
        contents: prompt,
        config: {
            systemInstruction: systemInstructionText,
            temperature: 0.7,
        }
    });
    return response.text;
};

export const generateMultimodalService = async (model, prompt, fileBuffer, mimeType) => {
    // Ubah file buffer menjadi base64 untuk input multimodal
    const base64Data = fileBuffer.toString("base64");
    console.log(`MIME Type: ${mimeType}, Base64 Length: ${base64Data.length}`);
    console.log(`Menggunakan model: ${model || GEMINI_MODEL}`);
    console.log(`Prompt: ${prompt}`);
    console.log(`System Instruction: ${systemInstructionMultimodal}`);


    const response = await ai.models.generateContent({
        model: model || GEMINI_MODEL,
        contents: [
            { text: prompt, type: "text" },
            { inlineData: { data: base64Data, mimeType: mimeType } }
        ],
        config: {
            systemInstruction: systemInstructionMultimodal,
            temperature: 0.4,
        }
    });
    return response.text;
};