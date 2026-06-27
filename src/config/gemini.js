import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: dotenv.config().parsed.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-flash-lite-latest"; // Menggunakan model terbaru yang efisien

export { ai, GEMINI_MODEL };