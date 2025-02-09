import os
import yt_dlp
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import YoutubeLoader
from langchain.chains import RetrievalQA
from langchain_community.chat_models import ChatOllama
import logging

DB_PATH = "vector_db"
MODEL_NAME = "mistral"  # Change as needed (e.g., "llama3", "gemma")

# Load embeddings
embeddings = OllamaEmbeddings(model=MODEL_NAME)

def create_db_from_youtube_video_url(youtube_url: str):
    """Download and process YouTube transcript into FAISS vector database."""
    try:
        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'outtmpl': '%(id)s.%(ext)s',
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(youtube_url, download=False)
            video_title = info_dict.get('title', None)
            logging.info(f"Processing video: {video_title}")

            # FIX: Pass youtube_url instead of info_dict
            transcript = extract_transcript(youtube_url)

            # Split transcript into chunks
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=100)
            docs = text_splitter.split_documents(transcript)

            # Store in FAISS
            vector_db = FAISS.from_documents(docs, embeddings)
            vector_db.save_local(DB_PATH)
            logging.info(f"FAISS database saved successfully at {DB_PATH}")
            
    except Exception as e:
        logging.error(f"Error processing video: {e}")
        raise Exception(f"Error processing video: {e}")

def extract_transcript(video_url):
    loader = YoutubeLoader.from_youtube_url(video_url)
    return loader.load()

def get_response_from_query(query: str):
    """Retrieve the best-matching response from FAISS using LangChain."""
    if not os.path.exists(f"{DB_PATH}/index.faiss") or not os.path.exists(f"{DB_PATH}/index.pkl"):
        raise Exception("Database not found. Process a video first.")
    
    # Allow loading of the pickle file by setting allow_dangerous_deserialization=True
    vector_db = FAISS.load_local(DB_PATH, embeddings, allow_dangerous_deserialization=True)
    retriever = vector_db.as_retriever()
    
    llm = ChatOllama(model=MODEL_NAME)
    qa_chain = RetrievalQA.from_chain_type(llm, retriever=retriever)
    
    return qa_chain.run(query)

