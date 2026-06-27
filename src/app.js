import 'dotenv/config';
import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import rateLimit from "express-rate-limit";
import aiRoutes from './routes/aiRoute.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: {
        status: 'error',
        message: 'Terlalu banyak permintaan dari IP ini, silakan coba lagi nanti.'
    }
})

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiLimiter);

// Membaca file hasil autogen
const swaggerDocument = JSON.parse(fs.readFileSync(new URL('../swagger_output.json', import.meta.url)));

// Pemasangan rute Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Pemasangan rute utama
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`📚 Dokumentasi Autogen siap di http://localhost:${PORT}/api-docs`);
});