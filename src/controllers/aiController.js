import { generateTextService, generateMultimodalService } from '../services/aiService.js';

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
                    model: { type: "string", example: "gemini-2.5-flash" },
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
        const result = await generateMultimodalService(model, prompt, req.file.buffer, req.file.mimetype);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateFromDocument = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "File dokumen wajib diunggah." });

        const { model, prompt } = req.body;
        const result = await generateMultimodalService(model, prompt, req.file.buffer, req.file.mimetype);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateFromAudio = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "File audio wajib diunggah." });

        const { model, prompt } = req.body;
        const result = await generateMultimodalService(model, prompt, req.file.buffer, req.file.mimetype);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
