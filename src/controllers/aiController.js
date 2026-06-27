import { generateTextService, generateMultimodalService, generateChatService } from '../services/aiService.js';

export const generateText = async (req, res) => {
    /*  #swagger.tags = ['Gemini AI']
        #swagger.summary = 'Menghasilkan teks dari prompt biasa'
        #swagger.parameters['body'] = {
            in: 'body',
            name: 'body',
            description: 'Payload data untuk menghasilkan teks',
            required: true,
            schema: {
                type: "object",
                properties: {
                    model: { type: "string", example: "gemini-3.1-flash-lite" },
                    prompt: { type: "string", example: "Jelaskan apa itu AI" }
                }
            }
        }
    */
    try {
        const { model, prompt } = req.body;
        const result = await generateTextService(model, prompt);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateFromImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "File gambar wajib diunggah." });

        const { model, prompt } = req.body;

        const result = await generateMultimodalService(model, prompt, req.file);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateFromDocument = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "File dokumen wajib diunggah." });

        const { model, prompt } = req.body;
        const result = await generateMultimodalService(model, prompt, req.file);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateFromAudio = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "File audio wajib diunggah." });

        const { model, prompt } = req.body;
        const result = await generateMultimodalService(model, prompt, req.file);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateChat = async (req, res) => {
    /* #swagger.tags = ['Gemini AI']
        #swagger.summary = 'Chatbot Multi-turn dengan Gemini'
        #swagger.parameters['body'] = {
            in: 'body',
            name: 'body',
            description: 'Payload data untuk riwayat percakapan chatbot',
            required: true,
            schema: {
                type: "object",
                properties: {
                    model: { type: "string", example: "gemini-3.1-flash-lite" },
                    conversation: { 
                        type: "array", 
                        items: {
                            type: "object",
                            properties: {
                                role: { type: "string", example: "user" },
                                text: { type: "string", example: "Halo, apa itu Gemini?" }
                            }
                        }
                    }
                }
            }
        }
    */
    try {
        let { model, conversation } = req.body;

        // VALIDASI 1: Pastikan properti conversation dikirim oleh frontend
        if (!conversation) {
            return res.status(400).json({ message: "Properti 'conversation' wajib diisi." });
        }

        // DEFENSIVE PROGRAMMING: Jika frontend mengirim string (bukan array), 
        // kita bungkus otomatis menjadi format array yang benar agar server tidak crash.
        if (typeof conversation === 'string') {
            conversation = [{ role: 'user', text: conversation }];
        }

        // VALIDASI 2: Pastikan format akhir sudah berupa array sebelum masuk ke service 
        if (!Array.isArray(conversation)) {
            return res.status(400).json({ message: "Properti 'conversation' harus berupa array riwayat pesan." });
        }

        const result = await generateChatService(model, conversation);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
