from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(title="YouTube AI Assistant API")

# Enable CORS for all origins (or specify frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify a specific URL for your frontend like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

# Include Routes
app.include_router(router)

@app.get("/")
def root():
    return {"message": "YouTube AI Assistant is running!"}
