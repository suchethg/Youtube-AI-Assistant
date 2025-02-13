YouTube AI Assistant
A YouTube AI Assistant application built using React and FastAPI. This application extracts transcripts from YouTube videos, stores them in a FAISS vector database, and enables users to interact with the transcript through a chatbot interface. The assistant provides context-aware responses using LangChain and Ollama embeddings. It leverages the YouTube API for automated transcript extraction, enabling a seamless and interactive experience for users.

Features
Video Transcript Extraction: Automatically extracts transcripts from YouTube videos using the YouTube API.
FAISS Vector Database: Stores extracted video transcripts in a FAISS vector database for efficient search and retrieval.
Context-Aware Chatbot: Uses LangChain and Ollama embeddings for generating relevant responses to user queries.
Interactive User Interface: Built with React for a responsive, user-friendly experience.
Real-Time Question-Answering: Users can ask questions about the video content, and the system will respond based on the transcript stored in the database.
Tech Stack
Frontend: React
Backend: FastAPI
Database: FAISS (vector database)
Embeddings: LangChain, Ollama embeddings
API: YouTube API
Others: Python, Axios
Setup
Prerequisites
Ensure you have the following tools installed on your machine:

Python (>= 3.x)
Node.js (>= 12.x)
npm/yarn (for managing React dependencies)
