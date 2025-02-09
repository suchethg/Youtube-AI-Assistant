import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

function VideoInput() {
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [videoId, setVideoId] = useState(null); // State to store video ID for embedding

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/process_video/", {
        youtube_url: videoUrl, // Send youtube_url instead of video_url
      });
      setMessage(response.data.message);

      // Extract the video ID from the URL and store it to embed the video
      const urlParams = new URLSearchParams(new URL(videoUrl).search);
      const videoID = urlParams.get("v");
      setVideoId(videoID);
    } catch (error) {
      setMessage("Error processing video");
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Enter YouTube URL to Process
      </Typography>
      <TextField
        label="YouTube URL"
        variant="outlined"
        fullWidth
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Process
        </Button>
      </Box>
      {message && (
        <Typography variant="body2" sx={{ marginTop: 2, textAlign: "center" }}>
          {message}
        </Typography>
      )}

      {/* Display video if videoId exists */}
      {videoId && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
            Video Preview
          </Typography>
          <Box sx={{
            position: 'relative',
            paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
            height: 0,
            overflow: 'hidden',
            maxWidth: '100%',
            width: '100%',
            borderRadius: 2,
            boxShadow: 3,
          }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '8px',
              }}
            ></iframe>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default VideoInput;
