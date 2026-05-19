# Legal Sahayak

Legal Sahayak is a local/offline-first legal document assistant.

It allows users to upload legal PDF documents, extract text using OCR, create searchable indexes using FAISS and BM25, and ask legal-document-related questions through a React frontend.

> Note: This project is currently designed as a local web application and can later be packaged as an Electron desktop application.

---

## 1. Project Purpose

The purpose of this project is to provide an offline legal document analysis system where a user can:

- Upload a legal PDF document
- Extract text from scanned or image-based PDFs using OCR
- Convert extracted legal text into searchable chunks
- Store document vectors using FAISS
- Search documents using dense retrieval and BM25 sparse search
- Rerank retrieved results
- Generate answers using a local GGUF legal language model
- Display the final response in the frontend chat interface

This project is intended for legal document review, contract understanding, clause extraction, and offline legal assistant workflows.

---

## 2. Quick Start / How to Run

Open two terminals.

### Terminal 1: Run Backend

```bash
cd backend
npm install
npm run dev
```

Expected output:

```txt
Server running on port 5000
```

Backend URL:

```txt
http://localhost:5000
```

Backend health check:

```txt
http://localhost:5000/
```

Expected response:

```txt
Legalsahayak Backend Running
```

---

### Terminal 2: Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend usually runs on:

```txt
http://localhost:5173
```

Now open the frontend URL in browser.

Test flow:

1. Upload a legal PDF
2. Enter a legal query
3. Click Send
4. Wait for OCR, ingestion, indexing, and AI response

---

## 3. Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- lucide-react icons

### Backend

- Node.js
- Express.js
- Multer for PDF upload
- CORS
- Node Child Process API to run Python scripts

### Python / ML Pipeline

- PaddleOCR for OCR extraction
- pdf2image for PDF-to-image conversion
- SentenceTransformers for embeddings
- FAISS for dense vector search
- BM25 for sparse keyword retrieval
- CrossEncoder reranker
- LangChain agent
- LlamaCpp for running local GGUF model

---

## 4. High-Level Architecture

```txt
Frontend React App
        |
        | FormData: text + optional PDF file
        v
Node.js Express Backend
        |
        | If PDF exists
        v
OCR Extraction using PaddleOCR
        |
        v
temp_contract.txt
        |
        v
ingestion.py
        |
        | Creates FAISS + BM25 indexes
        v
run_agent.py
        |
        | Searches contract/statutes
        | Uses local GGUF model
        v
Backend Response
        |
        v
Frontend Chat UI
```

---

## 5. Folder Structure

Important project structure:

```txt
legal-sahaykk/
│
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   │
│   │   ├── components/
│   │   │   ├── AppModal.jsx
│   │   │   ├── ChatArea.jsx
│   │   │   ├── DocumentViewer.jsx
│   │   │   ├── InputBar.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   └── pages/
│   │       ├── ActivityPage.jsx
│   │       ├── HelpPage.jsx
│   │       └── SettingsPage.jsx
│
├── backend/
│   ├── package.json
│   ├── index.js
│   ├── app.js
│   ├── result.txt
│   │
│   ├── routes/
│   │   └── ai.route.js
│   │
│   ├── controllers/
│   │   └── ai.controller.js
│   │
│   ├── middlewares/
│   │   └── multer.middleware.js
│   │
│   ├── uploads/
│   │   └── uploaded PDF files
│   │
│   └── python/
│       └── LegalSahayk/
│           ├── ocr_extract.py
│           ├── ingestion.py
│           ├── run_agent.py
│           ├── temp_contract.txt
│           │
│           ├── models/
│           │   └── LegalSahyak_q4_k_m.gguf
│           │
│           ├── data_scrapping/
│           │   └── sme_statutes_db.json
│           │
│           ├── db_contract.faiss
│           ├── db_contract_bm25.pkl
│           ├── db_contract_meta.json
│           │
│           ├── db_statutes.faiss
│           ├── db_statutes_bm25.pkl
│           └── db_statutes_meta.json
```

> Note: `node_modules` should not be committed or documented as part of the main project structure.

---

## 6. Frontend File Explanation

### `frontend/src/App.jsx`

Main React application file.

Responsibilities:

- Maintains chat messages state
- Handles user input
- Sends user query and PDF file to backend
- Receives backend response
- Displays assistant response in chat UI
- Controls sidebar, document viewer, dark mode, and page navigation

Backend API call is made from this file using:

```js
fetch("http://localhost:5000/api/ai/ask", {
  method: "POST",
  body: formData,
});
```

The backend response is displayed in chat using:

```js
content: data.answer || data.error || data.message || "No response from backend.";
```

---

### `frontend/src/components/InputBar.jsx`

Input component used for user queries and PDF upload.

Responsibilities:

- Takes user text input
- Allows PDF file selection
- Sends both text and file to `App.jsx`
- Disables input while backend is processing

Expected data sent upward:

```js
onSend(text, file);
```

---

### `frontend/src/components/ChatArea.jsx`

Responsible for displaying chat messages.

Responsibilities:

- Shows user messages
- Shows assistant messages
- Shows loading/typing state
- Displays suggested prompts

---

### `frontend/src/components/MessageBubble.jsx`

Responsible for rendering individual message bubbles.

Responsibilities:

- Displays user messages differently from assistant responses
- Helps maintain clean chat UI

---

### `frontend/src/components/DocumentViewer.jsx`

Right-side document panel.

Responsibilities:

- Displays document preview or sample legal document content
- Opens when document-related keyword is detected

---

### `frontend/src/components/Sidebar.jsx`

Sidebar navigation component.

Responsibilities:

- Displays dummy chat history
- Handles new chat button
- Navigation to Help, Activity, and Settings pages

---

### `frontend/src/pages/HelpPage.jsx`

Static help page.

---

### `frontend/src/pages/ActivityPage.jsx`

Static activity/history page.

---

### `frontend/src/pages/SettingsPage.jsx`

Static settings page.

---

## 7. Backend File Explanation

### `backend/package.json`

Backend Node.js dependency and script file.

Current script:

```json
"scripts": {
  "dev": "node index.js"
}
```

Main backend dependencies:

- express
- cors
- multer
- pdf-parse
- pdf2json

---

### `backend/index.js`

Main backend server entry file.

Responsibilities:

- Creates Express server
- Enables CORS
- Enables JSON parsing
- Registers AI routes under `/api/ai`
- Starts backend server on port `5000`

Backend health check:

```txt
GET /
```

Expected response:

```txt
Legalsahayak Backend Running
```

---

### `backend/app.js`

This file currently exists in the backend folder, but the active server entry point is `backend/index.js`.

---

### `backend/routes/ai.route.js`

Defines AI API route.

Current route:

```js
router.post("/ask", upload.single("file"), askAI);
```

Final API endpoint:

```txt
POST http://localhost:5000/api/ai/ask
```

This endpoint accepts:

- `text` field
- optional PDF file under field name `file`

---

### `backend/controllers/ai.controller.js`

Main backend AI controller.

Responsibilities:

1. Receives user text from request body
2. Checks if a PDF file is uploaded
3. If PDF exists:
   - Runs `ocr_extract.py`
   - Waits for OCR completion
   - Runs `ingestion.py`
   - Waits for FAISS/BM25 indexing
4. Runs `run_agent.py` with the user query
5. Captures Python output
6. Sends response back to frontend

Main flow:

```txt
Request received
    |
    |-- If PDF exists
    |     |
    |     |-- Run OCR extraction
    |     |-- Run ingestion
    |
    |-- Run AI agent
    |
    |-- Return answer to frontend
```

Backend success response:

```json
{
  "success": true,
  "answer": "AI generated answer"
}
```

Backend error response:

```json
{
  "success": false,
  "error": "Error message"
}
```

---

### `backend/middlewares/multer.middleware.js`

Handles PDF file upload.

Responsibilities:

- Saves uploaded PDF files into `uploads/`
- Generates unique filename using current timestamp
- Exports configured `upload` middleware

Current upload field name:

```txt
file
```

---

## 8. Python AI Pipeline Files

### `backend/python/LegalSahayk/ocr_extract.py`

OCR extraction script.

Responsibilities:

1. Receives uploaded PDF path from Node backend
2. Converts PDF pages into images using `pdf2image`
3. Runs PaddleOCR on each page image
4. Extracts text from OCR results
5. Saves extracted text into:

```txt
backend/python/LegalSahayk/temp_contract.txt
```

Output:

```txt
OCR Extraction Complete
```

Important dependency:

- Poppler must be installed for `pdf2image` on Windows.

---

### `backend/python/LegalSahayk/ingestion.py`

Ingestion and indexing script.

Responsibilities:

1. Loads embedding model
2. Reads statutory legal database from:

```txt
data_scrapping/sme_statutes_db.json
```

3. Reads uploaded contract text from:

```txt
temp_contract.txt
```

4. Chunks contract text
5. Creates dense vector embeddings
6. Builds FAISS index
7. Builds BM25 sparse index
8. Saves metadata

Generated files:

```txt
db_contract.faiss
db_contract_bm25.pkl
db_contract_meta.json

db_statutes.faiss
db_statutes_bm25.pkl
db_statutes_meta.json
```

Dense retrieval:

```txt
FAISS
```

Sparse retrieval:

```txt
BM25
```

---

### `backend/python/LegalSahayk/run_agent.py`

Main legal AI agent script.

Responsibilities:

1. Loads embedding model
2. Loads reranker model
3. Loads FAISS and BM25 databases
4. Defines contract search tool
5. Defines statute search tool
6. Loads local GGUF model using LlamaCpp
7. Creates LangChain ReAct agent
8. Receives query from Node.js
9. Searches relevant context
10. Generates final answer
11. Prints answer back to Node backend

Current local model path is relative:

```py
BASE_DIR = os.path.dirname(__file__)

model_path = os.path.join(
    BASE_DIR,
    "models",
    "LegalSahyak_q4_k_m.gguf"
)
```

This makes the model portable across different systems.

---

## 9. API Documentation

### Ask AI API

```txt
POST /api/ai/ask
```

Full local URL:

```txt
http://localhost:5000/api/ai/ask
```

### Request Type

```txt
multipart/form-data
```

### Request Fields

| Field | Type | Required | Description |
|---|---|---|---|
| text | string | Yes | User question/query |
| file | PDF file | No | Legal document PDF |

### Example Request

Using frontend:

```js
const formData = new FormData();

formData.append("text", userText);

if (file) {
  formData.append("file", file);
}

fetch("http://localhost:5000/api/ai/ask", {
  method: "POST",
  body: formData,
});
```

### Success Response

```json
{
  "success": true,
  "answer": "The extracted answer from the legal document..."
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error details..."
}
```

---

## 10. Models Used

### OCR

```txt
PaddleOCR
```

Used for extracting text from scanned PDF documents.

---

### Embedding Model

Current model:

```txt
BAAI/bge-small-en-v1.5
```

Used for generating dense embeddings for FAISS retrieval.

For low-end CPU systems, the model can be replaced with:

```txt
all-MiniLM-L6-v2
```

Important:

If the embedding model is changed, both `ingestion.py` and `run_agent.py` must use the same model. Existing FAISS indexes must be rebuilt.

---

### Reranker

```txt
BAAI/bge-reranker-large
```

Used to rerank retrieved chunks for better answer accuracy.

Note:

This model is CPU-heavy. It can be disabled or replaced with a lighter reranker for faster local performance.

---

### LLM

```txt
LegalSahyak_q4_k_m.gguf
```

Loaded using:

```txt
llama_cpp_python
```

This model runs locally/offline using LlamaCpp.

---

### Vector Database

```txt
FAISS
```

Used for dense similarity search.

---

### Sparse Search

```txt
BM25
```

Used for keyword-based legal document retrieval.

---

## 11. Setup Instructions

### Prerequisites

Install the following:

- Node.js
- npm
- Python
- pip
- Poppler for Windows
- Git

Recommended Python version:

```txt
Python 3.10
```

Python 3.12 may work, but PaddleOCR and PaddlePaddle are usually more stable on Python 3.10.

---

## 12. Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend usually runs on:

```txt
http://localhost:5173
```

---

## 13. Backend Setup

Go to backend folder:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

Test backend health:

```txt
http://localhost:5000/
```

Expected response:

```txt
Legalsahayak Backend Running
```

---

## 14. Python Setup

Inside backend folder, create virtual environment:

```bash
py -3.10 -m venv venv
```

Activate virtual environment:

```bash
venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

If `requirements.txt` is not available, create it using:

```bash
pip freeze > requirements.txt
```

---

## 15. Poppler Setup for OCR

`pdf2image` requires Poppler on Windows.

Steps:

1. Download Poppler for Windows
2. Extract it
3. Add Poppler `bin` folder to system PATH
4. Restart terminal
5. Test again

Without Poppler, OCR PDF conversion may fail.

---

## 16. Full Run Flow

Open two terminals.

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

Expected:

```txt
Server running on port 5000
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Expected:

```txt
http://localhost:5173
```

Now open frontend in browser and test:

1. Upload a PDF
2. Enter a legal query
3. Click Send
4. Wait for OCR + ingestion + AI response

---

## 17. PDF Upload Flow

```txt
User uploads PDF from frontend
        |
        v
Multer saves PDF in uploads folder
        |
        v
Node backend runs ocr_extract.py
        |
        v
OCR text saved into temp_contract.txt
        |
        v
Node backend runs ingestion.py
        |
        v
FAISS and BM25 indexes are created
        |
        v
Node backend runs run_agent.py
        |
        v
AI searches contract/statutes
        |
        v
Local GGUF model generates response
        |
        v
Frontend displays answer
```

---

## 18. Important Notes for ML Team

The AI pipeline is located inside:

```txt
backend/python/LegalSahayk/
```

OCR logic is handled by:

```txt
ocr_extract.py
```

Embedding and indexing logic is handled by:

```txt
ingestion.py
```

Retrieval + reranking + LLM answer generation is handled by:

```txt
run_agent.py
```

Local GGUF model should be placed inside:

```txt
backend/python/LegalSahayk/models/
```

Legal statute database should be placed inside:

```txt
backend/python/LegalSahayk/data_scrapping/
```

Uploaded contract text is temporarily stored as:

```txt
temp_contract.txt
```

---

## 19. Known Limitations

Current limitations:

- Current version is designed for single-user local usage
- OCR is slow on low-end CPU systems
- Large scanned PDFs may take time
- Model loading can be slow on weak laptops
- Python scripts are spawned per request, so models reload each time
- Reranker model is heavy for CPU-only systems
- App is not yet packaged as an Electron desktop application
- This system is not a substitute for professional legal advice

---

## 20. Recommended Improvements

Future improvements:

- Convert Python AI pipeline into a persistent FastAPI server
- Load embedding model, reranker, FAISS, and GGUF model only once at startup
- Add streaming responses
- Add citation-based answers
- Add document clause highlighting
- Add legal document validation before ingestion
- Add scanned-PDF detection
- Add OCR only when needed
- Add Electron desktop packaging
- Add better error handling
- Add user-friendly loading states for OCR and model processing

---

## 21. Desktop App Plan

This project can be converted into an offline Electron desktop app.

Planned desktop architecture:

```txt
Electron UI
    |
    v
Local Node backend
    |
    v
Local Python AI engine
    |
    v
Offline GGUF model + FAISS + OCR
```

In desktop mode, the user should not need to manually run:

```txt
npm run dev
python scripts
VS Code
```

The packaged app should start backend and AI engine automatically in the background.

---

## 22. Troubleshooting

### Problem: Frontend shows backend connection failed

Check:

- Backend is running on port 5000
- CORS is enabled
- API URL is correct:

```txt
http://localhost:5000/api/ai/ask
```

---

### Problem: PDF upload not working

Check backend route:

```js
router.post("/ask", upload.single("file"), askAI);
```

Check frontend field name:

```js
formData.append("file", file);
```

Both must use the same field name:

```txt
file
```

---

### Problem: OCR is slow

Reason:

- PaddleOCR runs on CPU
- Scanned PDFs need page-by-page OCR

Possible improvements:

- Use text-based PDF parsing first
- Run OCR only if PDF text extraction fails
- Limit max pages
- Use better hardware

---

### Problem: Stuck at "Loading Dense Embedding Model"

Reason:

- SentenceTransformer model is loading/downloading
- CPU is slow
- HuggingFace cache is not ready

Fix:

Use lighter embedding model:

```py
SentenceTransformer("all-MiniLM-L6-v2", device="cpu")
```

Important:

Change this in both:

```txt
ingestion.py
run_agent.py
```

Then delete old FAISS files and rebuild indexes.

---

### Problem: FAISS dimension mismatch

Reason:

Embedding model changed but old FAISS index was created with previous embedding size.

Fix:

Delete old index files:

```bash
del python\LegalSahayk\db_contract.faiss
del python\LegalSahayk\db_contract_bm25.pkl
del python\LegalSahayk\db_contract_meta.json
```

Then upload PDF again to rebuild indexes.

---

## 23. Disclaimer

This project is a technical prototype for legal document assistance.

It does not provide certified legal advice. All outputs should be reviewed by a qualified legal professional before use.