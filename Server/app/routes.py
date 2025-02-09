from fastapi import APIRouter, HTTPException
from app.database import create_db_from_youtube_video_url, get_response_from_query
from pydantic import BaseModel
import logging

router = APIRouter()

class VideoRequest(BaseModel):
    youtube_url: str

class QueryRequest(BaseModel):
    query: str

@router.post("/process_video/")
async def process_video(request: VideoRequest):
    """Process a YouTube video and store embeddings in FAISS."""
    try:
        create_db_from_youtube_video_url(request.youtube_url)
        return {"message": "Video processed successfully"}
    except Exception as e:
        logging.error(f"Error processing video: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing video: {e}")

@router.post("/ask/")
async def ask_question(request: QueryRequest):
    """Get a response to a question based on the processed video."""
    try:
        response = get_response_from_query(request.query)
        return {"response": response}
    except Exception as e:
        logging.error(f"Error getting response: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting response: {e}")