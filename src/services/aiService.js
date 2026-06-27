import { ai, GEMINI_MODEL } from '../config/gemini.js';

const systemInstructionText = "Kamu adalah asisten AI Senior dari Hacktiv8. Selalu jawab dengan profesional, jelas, ramah, dan gunakan format Markdown yang rapi untuk setiap penjelasanmu."
const systemInstructionMultimodal = "Kamu adalah analis data AI. Berikan analisis yang tajam dan akurat berdasarkan file yang diberikan."
const systemInstructionChat = "Kamu adalah asisten AI yang membantu pengguna dengan pertanyaan mereka. Jawab dengan jelas, ramah, dan gunakan bahasa Indonesia. Apabila pengguna meminta mu bertindak sebagai persona tertentu, lakukan sesuai permintaan mereka."

export const generateTextService = async (model, prompt) => {
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

export const generateChatService = async (model, conversation) => {
    // Validasi format input dari frontend
    if (!Array.isArray(conversation)) {
        throw new Error('Messages must be an array!');
    }

    // Mapping format request dari FE ke format yang dikenali Gemini SDK
    const contents = conversation.map(({ role, text }) => ({
        role, // 'user' atau 'model'
        parts: [{ text }] // Setiap pesan dipecah menjadi "parts" agar Gemini SDK bisa memprosesnya
    }));

    // Memanggil API dengan konfigurasi yang bisa disesuaikan
    const response = await ai.models.generateContent({
        model: model || GEMINI_MODEL, // Gunakan model default jika tidak ada yang dipilih
        contents, // 
        config: {
            temperature: 0.5, // Mengontrol kreativitas (0.0 - 1.0)
            systemInstruction: systemInstructionChat, // Instruksi sistem untuk model
        }
    });

    return response.text;
};