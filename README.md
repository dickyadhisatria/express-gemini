# 🚀 Express Gemini API

A powerful, multimodal RESTful API built with **Node.js**, **Express**, and **Clean Architecture**. This project integrates the **Google Gemma 4, Gemini Flash, and Gemini Flash Lite AI** to process text, images, documents, and audio seamlessly. 

It also features auto-generated API documentation using **Swagger UI**, making it incredibly easy to test and interact with the endpoints directly from your browser.

---

## ✨ Features

- **🧠 Text Generation:** Generate human-like text responses from simple text prompts.
- **🖼️ Image Analysis:** Upload images (`.jpg`, `.png`) along with a prompt to get detailed AI descriptions.
- **📄 Document Summarization:** Upload documents (`.pdf`, `.txt`) and ask the AI to extract key points or summarize them.
- **🎵 Audio Transcription:** Upload audio files (`.mp3`, `.wav`) to generate transcripts or analyze the spoken content.
- **🏗️ Clean Architecture:** Separation of concerns (Routes, Controllers, Services) for highly maintainable and scalable code.
- **📚 Swagger UI:** Interactive, auto-generated API documentation. No Postman required!

---

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/) (v18+)
- **Framework:** [Express.js](https://expressjs.com/)
- **Logger:**  [Morgan](https://expressjs.com/en/resources/middleware/morgan/) (Logger Middleware)
- **Documentation:** [Swagger Autogen](https://swagger-autogen.github.io/) & Swagger UI Express
- **Rate Limiting:** [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) (Prevent Abuse)
- **Environment Variables:** [dotenv](https://www.npmjs.com/package/dotenv) (Secure API Key Management)
- **AI Integration:** [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemma 4, Gemini Flash, Gemini Flash Lite)
- **File Handling:** [Multer](https://www.npmjs.com/package/multer) (Memory Storage)
- **Validation:** [Zod](https://www.npmjs.com/package/zod) (Input Validation)

---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### 1. Prerequisites
- Node.js v18 or higher installed.
- A Google Gemini API Key. Get it for free at [Google AI Studio](https://aistudio.google.com/).

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone [https://github.com/dickyadhisatria/express-gemini.git](https://github.com/dickyadhisatria/express-gemini.git)
cd express-gemini
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your API key and preferred port:
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 4. Running the Application
Start the server. This command will automatically generate the swagger_output.json file and boot up the Express server:
```bash
npm start
```

## 📖 API Documentation (Swagger)
Once the server is running, you can test all the endpoints without any third-party tools. Open your browser and navigate to:
http://localhost:3000/api-docs

```
| Method | Endpoint | Description | Consumes |
| POST | /api/ai/generate-text | Generate text from prompt | application/json |
| POST | /api/ai/generate-from-image | Multimodal image analysis | multipart/form-data |
| POST | /api/ai/generate-from-document | Multimodal doc summarization | multipart/form-data |
| POST | /api/ai/generate-from-audio | Multimodal audio transcription | multipart/form-data |
| POST | /api/ai/generate-chat | Multimodal chat | multipart/form-data |
```

## 📁 Folder Structure
```
express-gemini/
├── public/
│   ├── index.html      # UI HTML file
│   ├── style.css       # UI CSS file
│   ├── script.js       # UI JavaScript file
├── src/
│   ├── config/          # API Key and Swagger configuration
│   ├── controllers/     # HTTP Request/Response and Swagger Annotations
│   ├── middlewares/     # Multer setup for memory storage, Error Handling, and Validation
│   ├── routes/          # API endpoint definitions
│   ├── services/        # Business logic & Gemini AI prompt handling
│   ├── validators/      # Input validation schemas for requests
│   └── app.js           # Express App Entry Point and Rate Limiting
├── .env                 # Environment variables (Ignored in Git)
├── package.json         # Dependencies and scripts
├── swagger.js           # Swagger autogen script
└── README.md            # Project documentation
```

## 🎓 Acknowledgements
This project was built as part of the Hacktiv8: AI Productivity and AI API Integration for Developers program [@hacktiv8](https://github.com/hacktiv8), supported by Google.org and the Asian Development Bank.

Created by Dicky Adhi Satria - 2026
