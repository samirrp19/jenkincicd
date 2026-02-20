import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Chip,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const API_BASE_URL = `${process.env.REACT_APP_OPENAPI_URL}/api/codegen/submit`;
const API_HISTORY_URL = `${process.env.REACT_APP_OPENAPI_URL}/api/codegen/history`;

const PromptsPanel = ({ appId, userId }) => {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!appId || !userId) return;

    // Fetch prompt history when the component loads
    const fetchHistory = async () => {
      try {
        const response = await axios.get(API_HISTORY_URL, {
          params: { app_id: appId, user_id: userId },
          headers: { UserId: userId },
        });

        if (response.data.history) {
          const history = response.data.history.map((item) => ({
            user: item.prompt,
            responses: item.responses.map((res) => ({
              summary: res.summary,
              documentation: res.documentation,
              filePath: res.filePath,
              code: res.code,
            })),
          }));
          setChats(history);
        }
      } catch (error) {
        console.error("Error fetching prompt history:", error);
      }
    };

    fetchHistory();
  }, [appId, userId]);

  const sendPrompt = async () => {
    if (!prompt.trim() || !appId || !userId) return;

    setLoading(true);

    try {
      const response = await axios.post(
        API_BASE_URL,
        {
          prompt,
          app_id: appId,
          context_id: "67ba8067fa75b1237026a004", // Replace with dynamic contextId if necessary
        },
        { headers: { UserId: userId } }
      );

      if (response.data.updated_files && response.data.documentation) {
        const { updated_files, documentation } = response.data;

        const newResponse = {
          user: prompt,
          responses: documentation.map((doc) => ({
            summary: doc.summary,
            documentation: doc.documentation,
            filePath: doc.filePath,
            code: doc.code,
          })),
        };

        setChats((prevChats) => [...prevChats, newResponse]);
      } else {
        setChats((prevChats) => [
          ...prevChats,
          {
            user: prompt,
            responses: [
              {
                summary: `❌ AI failed to generate a response. Error: ${
                  response.data.message || "Unknown error"
                }`,
              },
            ],
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending prompt:", error);

      setChats((prevChats) => [
        ...prevChats,
        {
          user: prompt,
          responses: [
            {
              summary: "❌ API error. Unable to process your request. Please try again later.",
            },
          ],
        },
      ]);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <Box sx={styles.panel}>
      <Typography variant="h5" sx={styles.header}>
        AI Prompt Chat
      </Typography>
      <Paper elevation={3} sx={styles.chatBox}>
        {chats.length === 0 ? (
          <Box sx={styles.centeredInput}>
            <TextField
              placeholder="Type your prompt..."
              variant="outlined"
              size="small"
              fullWidth
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              sx={styles.metallicTextField}
            />
            <Button
              variant="contained"
              sx={styles.metallicButton}
              onClick={sendPrompt}
              disabled={prompt.trim() === "" || loading}
            >
              {loading ? <CircularProgress size={20} /> : "Send"}
            </Button>
          </Box>
        ) : (
          chats.map((chat, index) => (
            <Box key={index} sx={styles.chat}>
              <Typography variant="h6" sx={styles.userPrompt}>
                {chat.user}
              </Typography>
              {chat.responses.map((response, i) => (
                <Box key={i} sx={styles.responseBox}>
                  <Typography variant="body1" sx={styles.summary}>
                    <strong>Summary:</strong> {response.summary}
                  </Typography>
                  <Typography variant="body2" sx={styles.documentation}>
                    <strong>Documentation:</strong> {response.documentation}
                  </Typography>
                  <Chip
                    label={`File Path: ${response.filePath}`}
                    variant="outlined"
                    color="primary"
                    sx={styles.filePathButton}
                    onClick={() => console.log(`File Path: ${response.filePath}`)} // Add navigation logic here
                  />
                  <Box sx={styles.codeBlock}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                      {response.code || "// No code provided"}
                    </SyntaxHighlighter>
                  </Box>
                </Box>
              ))}
            </Box>
          ))
        )}
      </Paper>
      {chats.length > 0 && (
        <Box sx={styles.inputContainer}>
          <TextField
            placeholder="Type your prompt..."
            variant="outlined"
            size="small"
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={styles.metallicTextField}
          />
          <Button
            variant="contained"
            sx={styles.metallicButton}
            onClick={sendPrompt}
            disabled={prompt.trim() === "" || loading}
          >
            {loading ? <CircularProgress size={20} /> : "Send"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

PromptsPanel.propTypes = {
  appId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

const styles = {
  panel: {
    backgroundColor: "#252526",
    padding: "20px",
    color: "#fff",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    marginBottom: "10px",
    textAlign: "center",
    color: "#f3f3f3",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  },
  chat: {
    marginBottom: "20px",
  },
  userPrompt: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  responseBox: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",
  },
  summary: {
    color: "#00ff00",
    marginBottom: "10px",
  },
  documentation: {
    color: "#f3f3f3",
    fontStyle: "italic",
    marginBottom: "10px",
    whiteSpace: "pre-wrap",
  },
  filePathButton: {
    marginBottom: "10px",
  },
  codeBlock: {
    backgroundColor: "#1e1e1e",
    padding: "10px",
    borderRadius: "8px",
    overflowX: "auto",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  metallicTextField: {
    backgroundColor: "linear-gradient(145deg, #444, #222)",
    border: "1px solid #4b4b4b",
    borderRadius: "4px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
    "& .MuiOutlinedInput-root": {
      color: "#d4d4d4",
      "& fieldset": {
        borderColor: "#666",
      },
      "&:hover fieldset": {
        borderColor: "#888",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#aaa",
      },
    },
  },
  metallicButton: {
    backgroundColor: "linear-gradient(145deg, #4b6cb7, #182848)",
    color: "#fff",
    borderRadius: "4px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
    "&:hover": {
      backgroundColor: "linear-gradient(145deg, #344e9d, #101e4f)",
    },
  },
};

export default PromptsPanel;
