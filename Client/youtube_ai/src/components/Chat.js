import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box, Divider } from "@mui/material";
import axios from "axios"; 

function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);

  const handleAsk = async () => {
    // Update the chat interface with the user question
    const newMessages = [
      ...messages,
      { sender: "user", text: question },
    ];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://localhost:8000/ask/", {
        query: question,
      });
      
      // Append the bot response to the chat
      setMessages([
        ...newMessages,
        { sender: "bot", text: res.data.response },
      ]);
      setResponse(res.data.response);
    } catch (error) {
      // In case of error, display an error message
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error getting response" },
      ]);
    }
    setQuestion(""); // Clear the input field
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Ask a Question About the Video
      </Typography>
      
      {/* Chat Container */}
      <Box sx={{ height: 400, overflowY: 'auto', marginBottom: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: 2,
            }}
          >
            <Paper
              sx={{
                padding: 1.5,
                backgroundColor: message.sender === "user" ? "#4CAF50" : "#1976D2",
                color: "#fff",
                maxWidth: "80%",
                borderRadius: 2,
                boxShadow: 3,
                wordWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "pre-line",
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      
      {/* Divider between chat and input */}
      <Divider sx={{ marginBottom: 2 }} />
      
      {/* Input and Button */}
      <TextField
        label="Your Question"
        variant="outlined"
        fullWidth
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAsk}>
        Ask
      </Button>
    </Paper>
  );
}

export default Chat;
