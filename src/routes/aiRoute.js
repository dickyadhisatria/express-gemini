import express from 'express';
import upload from '../middlewares/upload.js';
import {validate} from '../middlewares/validate.js';
import { 
    generateText, 
    generateFromImage, 
    generateFromDocument, 
    generateFromAudio,
    generateChat
} from '../controllers/aiController.js';
import {
    generateTextSchema,
    generateFromImageSchema,
    generateFromDocumentSchema,
    generateFromAudioSchema,
    generateChatSchema
} from '../validators/aiValidator.js';
/*  #swagger.tags = ['Gemini AI']
    #swagger.description = 'Rute untuk mengakses layanan AI Gemini 2.5 Flash'
*/

const router = express.Router();

router.post('/generate-text', validate(generateTextSchema), (req, res) => {
    /*  #swagger.tags = ['Gemini AI']
        #swagger.summary = 'Menghasilkan teks dari prompt biasa'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            model: { type: "string", example: "gemini-2.5-flash" },
                            prompt: { type: "string", example: "Jelaskan apa itu AI" }
                        }
                    }
                }
            }
        }
    */
    generateText(req, res);
});

// Route Image Upload (Format OpenAPI 3.x multipart)
router.post('/generate-from-image', upload.single('image'), validate(generateFromImageSchema), (req, res) => {
    /*  #swagger.tags = ['Gemini AI Multimodal']
        #swagger.summary = 'Analisis Gambar'
        #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            model: { type: "string", example: "gemini-2.5-flash" },
                            prompt: { type: "string", example: "Deskripsikan gambar ini" },
                            image: { type: "string", format: "binary", description: "Berkas gambar" }
                        }
                    }
                }
            }
        }
    */
    generateFromImage(req, res);
});

// Route Document Upload (Format OpenAPI 3.x multipart)
router.post('/generate-from-document', upload.single('document'), validate(generateFromDocumentSchema), (req, res) => {
    /*  #swagger.tags = ['Gemini AI Multimodal']
        #swagger.summary = 'Ringkas Dokumen (PDF, TXT)'
        #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            model: { type: "string", example: "gemini-2.5-flash" },
                            prompt: { type: "string", example: "Tolong buat ringkasan dari dokumen ini" },
                            document: { type: "string", format: "binary", description: "Berkas dokumen (PDF, TXT)" }
                        }
                    }
                }
            }
        }
    */
    generateFromDocument(req, res);
});

// Route Audio Upload (Format OpenAPI 3.x multipart)
router.post('/generate-from-audio', upload.single('audio'), validate(generateFromAudioSchema), (req, res) => {
    /*  #swagger.tags = ['Gemini AI Multimodal']
        #swagger.summary = 'Transkrip Audio'
        #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            model: { type: "string", example: "gemini-2.5-flash" },
                            prompt: { type: "string", example: "Tolong buatkan transkrip dari rekaman ini" },
                            audio: { type: "string", format: "binary", description: "Berkas audio" }
                        }
                    }
                }
            }
        }
    */
    generateFromAudio(req, res);
});

router.post('/generate-chat', validate(generateChatSchema), (req, res) => {
    /*  #swagger.tags = ['Gemini AI Chat']
        #swagger.summary = 'Menghasilkan teks dari percakapan'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            model: { type: "string", example: "gemini-2.5-flash" },
                            conversation: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        role: { type: "string", enum: ["user", "model", "system"] },
                                        parts: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    text: { type: "string" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    */
    generateChat(req, res);
});

export default router;
