import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import aiRoutes from './routes/aiRoute.js';

const app = express();
app.use(express.json());

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