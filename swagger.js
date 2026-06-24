import swaggerAutogen from 'swagger-autogen';

const doc = {
    openapi: "3.0.0", // Menegaskan penggunaan format OpenAPI 3.x
    info: {
        title: 'Gemini AI Clean API',
        description: 'REST API Terintegrasi Gemini 2.5 Flash menggunakan Clean Architecture dan Autogen',
        version: '1.0.0'
    },
    // Menggabungkan protokol, host, dan basePath lama menjadi URL Server utuh
    // Menambahkan server untuk mendukung OpenAPI 3.x untuk staging
    servers: [
        {
            description: 'Server Lokal',
            url: 'http://localhost:3000/api/ai'
        },
        {
            description: 'Server Staging',
            url: 'https://hsbp3wdb-3000.asse.devtunnels.ms/api/ai'
        }
    ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './src/routes/aiRoute.js',
];

// WAJIB: Masukkan opsi openapi di dalam kurung pertama swaggerAutogen
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
    console.log("Dokumentasi Swagger OpenAPI 3.x berhasil di-generate otomatis!");
});
