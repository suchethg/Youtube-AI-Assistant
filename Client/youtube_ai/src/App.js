import React from "react";
import VideoInput from "./components/VideoInput";
import Chat from "./components/Chat";
import { Container, Box, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h3" color="primary">
          YouTube AI Assistant
        </Typography>
      </Box>
      <VideoInput />
      <Chat />
    </Container>
  );
}

export default App;
