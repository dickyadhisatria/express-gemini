import { ai, GEMINI_MODEL } from '../config/gemini.js';

export const generateTextService = async (model, prompt) => {
    console.log(`Menggunakan model: ${model || GEMINI_MODEL}`);
    console.log(`Prompt: ${prompt}`);
    const response = await ai.models.generateContent({
        model: model || GEMINI_MODEL,
        contents: prompt,
    });
    return response.text;
};

export const generateMultimodalService = async (model, prompt, fileBuffer, mimeType) => {
    // Ubah file buffer menjadi base64 untuk input multimodal
    const base64Data = fileBuffer.toString("base64");
    console.log(`MIME Type: ${mimeType}, Base64 Length: ${base64Data.length}`);


    const response = await ai.models.generateContent({
        model: model || GEMINI_MODEL,
        contents: [
            { text: prompt, type: "text" },
            { inlineData: { data: base64Data, mimeType: mimeType } }
        ]
    });
    return response.text;
};