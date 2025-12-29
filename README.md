# Dev Chatbot (Django + React + Groq via LiteLLM)

A web-based chatbot with a React chat UI and a Django backend.  
The backend uses **Groq** (through **LiteLLM**) to generate responses, and can answer using a local **knowledge base text file (`chat.txt`)**. Chat messages are stored in the database and can be fetched as history.

---

## Features
- ✅ React chat widget UI (open/close, auto-scroll)
- ✅ Django API backend (`/api/chat/`)
- ✅ Groq LLM via LiteLLM (`litellm.completion`)
- ✅ Knowledge-base prompting using `chat.txt`
- ✅ Chat history saved to DB (`Message` model)
- ✅ History endpoint (`/api/history/`)

---

## Tech Stack
- **Frontend:** React (Vite) + TailwindCSS
- **Backend:** Django
- **LLM Provider:** Groq
- **LLM Router:** LiteLLM
- **Database:** SQLite (default Django DB)

---

## Project Structure (example)
