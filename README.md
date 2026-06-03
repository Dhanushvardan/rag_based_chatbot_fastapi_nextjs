# 🤖 LangGraph-Powered RAG AI Chatbot

> A dual-mode AI chatbot — direct LLM conversations and RAG-based document Q&A, orchestrated with LangGraph.

![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=flat-square&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat-square&logo=fastapi&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-latest-4B0082?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🧠 Overview

The **LangGraph-Powered RAG AI Chatbot** is a full-stack conversational AI application that supports two distinct modes:

- 💬 **Direct LLM Chat** — Talk to an LLM directly with full conversation history.
- 📚 **RAG Mode** — Upload documents and ask questions grounded in their content using Retrieval-Augmented Generation.

Built with **Next.js** on the frontend and **FastAPI + LangGraph** on the backend, the chatbot dynamically routes user queries through an intelligent agentic graph that decides whether to retrieve document context or respond directly from the LLM.

---

## ✨ Features

- 🔀 **Dual Mode** — Seamlessly switch between direct LLM chat and document Q&A
- 📎 **Document Upload** — Upload PDFs or text files; the system indexes them for RAG queries
- 🧩 **LangGraph Orchestration** — Conditional routing graph decides retrieval vs. direct generation
- 🗂️ **Vector Store Integration** — Embeds and retrieves document chunks with semantic search
- 🧠 **Conversation Memory** — Maintains multi-turn context in direct LLM mode
- ⚡ **Streaming Responses** — Token-by-token streaming from FastAPI to Next.js UI
- 🌐 **Next.js App Router** — Modern React architecture with server and client components

---

## 🏗️ Architecture

```
┌──────────────────────────┐
│      Next.js Frontend    │  ← Chat UI, document upload, mode switcher
└────────────┬─────────────┘
             │ HTTP / SSE (Streaming)
┌────────────▼─────────────┐
│     FastAPI Backend      │  ← API routing, session management
└────────────┬─────────────┘
             │
┌────────────▼─────────────┐
│   LangGraph Agent Graph  │
│                          │
│  ┌────────────────────┐  │
│  │  Router Node       │  │  ← Decides: RAG or Direct LLM?
│  └────────┬───────────┘  │
│           │                │
│    ┌──────┴──────┐         │
│    ▼             ▼         │
│  ┌────────┐ ┌─────────┐   │
│  │RAG Node│ │LLM Node │   │
│  └───┬────┘ └────┬────┘   │
│      │           │         │
│  ┌───▼──────────▼───┐     │
│  │  Response Node   │     │
│  └──────────────────┘     │
└────────────┬─────────────┘
             │
┌────────────▼─────────────┐
│      Vector Store        │  ← FAISS / ChromaDB for document embeddings
└──────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Frontend    | Next.js 14 (App Router), TailwindCSS |
| Backend     | FastAPI, Python 3.10+                |
| AI/LLM      | LangGraph, LangChain, OpenAI / Groq  |
| Vector DB   | FAISS / ChromaDB                     |
| Embeddings  | OpenAI Embeddings / HuggingFace      |
| Streaming   | FastAPI StreamingResponse / SSE      |
| File Parsing| PyMuPDF / pdfplumber                 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- An OpenAI (or compatible) API key

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/langgraph-rag-chatbot.git
cd langgraph-rag-chatbot
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `/backend`:

```env
OPENAI_API_KEY=your_openai_api_key
```

Start the FastAPI server:

```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 📁 Project Structure

```
langgraph-rag-chatbot/
├── backend/
│   ├── main.py                    # FastAPI entry point
│   ├── routers/
│   │   ├── chat.py                # Direct LLM chat endpoint
│   │   └── rag.py                 # Document upload & RAG query endpoint
│   ├── services/
│   │   ├── langgraph_agent.py     # LangGraph graph definition & routing
│   │   ├── rag_pipeline.py        # Document ingestion & retrieval
│   │   └── llm_service.py         # LLM wrapper & prompt templates
│   ├── utils/
│   │   └── pdf_parser.py
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Main chat interface
│   │   └── api/                   # Next.js API routes (optional proxy)
│   ├── components/
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── DocumentUpload.tsx
│   │   └── ModeToggle.tsx
│   └── package.json
└── README.md
```

---

## 🔄 How It Works

### Direct LLM Mode
1. User types a message in the chat UI.
2. FastAPI forwards it to the **LLM Node** in the LangGraph graph.
3. The LLM responds with full conversation context.
4. Response is streamed token-by-token back to the UI.

### RAG Mode
1. User uploads a document (PDF/text).
2. FastAPI parses, chunks, and embeds it into the vector store.
3. User asks a question; FastAPI routes it to the **RAG Node**.
4. LangGraph retrieves semantically relevant chunks and passes them as context to the LLM.
5. The grounded response is streamed back to the UI.

### Routing Logic (LangGraph)
```python
# Simplified routing condition
def route(state):
    if state["mode"] == "rag" and state["documents_loaded"]:
        return "rag_node"
    return "llm_node"
```

---

## 📸 Screenshots

> _Add screenshots of the chat UI, document upload panel, and RAG Q&A in action here._

---

## 🔮 Roadmap

- [ ] Multi-document support with source citation
- [ ] Persistent chat history with a database (MongoDB)
- [ ] Authentication & user sessions
- [ ] Support for more LLM providers (Anthropic, Mistral, Ollama)
- [ ] Hybrid search (semantic + keyword BM25)
- [ ] Voice input/output support

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Dhanushvardan A V J** — MERN Stack & AI Engineer  
[GitHub](https://github.com/your-username) · [LinkedIn](https://linkedin.com/in/your-profile)
