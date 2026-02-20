import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider
} from "@mui/material";
import useAuth from "hooks/useAuth";
import WorkspaceContextSidebar from "./WorkspaceContextSidebar";
import { usePostTypeStreamer } from "../hooks/usePostTypeStreamer";

const oneaiUrl = process.env.REACT_APP_OPENAPI_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const ChatPromptContainer = ({
  postType,
  appId,
  workspaceId,
  workspaceName,
  tempEfsPath,
  efsPath,
  selectedLanguage,
  onCodeGenerated,
  podcastEnabled = false,
  documentationEnabled = false
}) => {
  const { user, token } = useAuth();
  const [input, setInput] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState({});
  const [contextData, setContextData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const [code, setCode] = useState("");

  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);
  const partialFilesRef = useRef({});
  const programBuffer = useRef("");
  const packageInfoUrl = `${apiUrl}/api/projects/${user.username}/projects/ai/${appId}/ws/packages`;

  usePostTypeStreamer(postType, {
    token, user, appId, workspaceId, workspaceName,
    efsPath, tempEfsPath, setIsTyping, setLoading,
    setResponses, socketRef, partialFilesRef,
    setCode, programBuffer, selectedLanguage, onCodeGenerated
  });

  const fetchHistory = async () => {
    if (!appId || !workspaceId) return;
    try {
      const res = await fetch(
        `${oneaiUrl}/api/assistant/history?app_id=${appId}&workspace_id=${workspaceId}`,
        { headers: { "UserId": user.id } }
      );
      const data = await res.json();
      if (data.history) {
        const formatted = data.history.map((item) => ({
          prompt: item.prompt,
          created_at: item.created_at,
          responses: item.responses.map((r) => ({
            model_name: r.model_name,
            created_at: r.created_at,
            files: r.files.map((f) => ({
              file_path: f.file_path,
              content: f.content,
              install: f.install || [],
              created_at: f.created_at
            }))
          }))
        }));
        setHistory(formatted);
      }
    } catch (err) {
      console.error("❌ Error fetching history:", err);
    }
  };

  useEffect(() => {
    if (user.id) fetchHistory();
  }, [user.id, appId, workspaceId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [responses, code]);

  const handleSend = () => {
    if (!input.trim() || loading || !socketRef.current?.connected) return;

    const prompt = input.trim();
    setLoading(true);
    setInput("");
    setLastPrompt(prompt);
    setIsTyping(true);
    partialFilesRef.current = {};
    setResponses({});

    const eventName = postType === "programming" ? "generate_program_prompt" : "generate_prompt";

    const payload = postType === "programming"
      ? {
          user_id: user.id,
          prompt,
          app_id: appId,
          workspace_id: workspaceId,
          context_id: "67fedb735afd3e624ab6c9a8",
          framework: selectedLanguage,
          podcast_enabled: podcastEnabled,
          documentation_enabled: documentationEnabled
        }
      : {
          user_id: user.id,
          prompt,
          app_id: appId,
          workspace_id: workspaceId,
          workspaceName,
          context_id: "67fedb735afd3e624ab6c9a8",
          efsPath,
          tempEfsPath,
          podcast_enabled: podcastEnabled,
          documentation_enabled: documentationEnabled
        };

    socketRef.current.emit(eventName, payload);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Box ref={chatContainerRef} sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: "#F9F9FB" }}>
          {history.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>🕘 Past Responses</Typography>
              <Divider sx={{ mb: 2 }} />
              {history.map((entry, index) => (
                <Box key={`entry-${index}`} sx={{ mb: 4 }}>
                  <Box sx={{ mb: 2, p: 2, bgcolor: "#e3f2fd", borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: "#1976d2", fontWeight: "bold" }}>Prompt:</Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>{entry.prompt}</Typography>
                  </Box>
                  {entry.responses.map((response, rIdx) => (
                    <Box key={`response-${rIdx}`} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ color: "#666", mb: 1 }}>
                        Model: {response.model_name} — {new Date(response.created_at).toLocaleString()}
                      </Typography>
                      {response.files.map((file, fIdx) => (
                        <Box key={`file-${fIdx}`} sx={{ mb: 2, p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
                          <Typography variant="h6" sx={{ color: "#4a90e2", mb: 1 }}>📄 {file.file_path}</Typography>
                          {file.install?.length > 0 && (
                            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                              <strong>Install:</strong> <code>{file.install.join(" ")}</code>
                            </Typography>
                          )}
                          <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: "12px", borderRadius: "6px" }}>{file.content}</pre>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          )}

          {lastPrompt && (
            <Box sx={{ mb: 3, p: 2, bgcolor: "#e8f0fe", borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#1a73e8", mb: 1 }}>🧑‍💻 You Asked:</Typography>
              <Typography variant="body1">{lastPrompt}</Typography>
            </Box>
          )}

          {postType === "template" && Object.entries(responses).map(([folder, files]) => (
            <Box key={folder} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>📁 {folder}</Typography>
              <Divider sx={{ mb: 2 }} />
              {Object.entries(files).map(([filename, { content, install, complete }]) => (
                <Box key={filename} sx={{ mb: 2, p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
                  <Typography variant="h6" sx={{ color: "#4a90e2", mb: 1 }}>{filename}</Typography>
                  {install && install.size > 0 && (
                    <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                      <strong>Install:</strong> <code>{[...install].join(" ")}</code>
                    </Typography>
                  )}
                  <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: "12px", borderRadius: "6px" }}>{content}</pre>
                  {complete && <Typography variant="caption" sx={{ color: "#4caf50" }}>✅ Complete</Typography>}
                </Box>
              ))}
            </Box>
          ))}

          {postType === "programming" && code && (
            <Box sx={{ mb: 2, p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ color: "#4a90e2", mb: 1 }}>📄 main.{selectedLanguage}</Typography>
              <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: "12px", borderRadius: "6px" }}>{code}</pre>
            </Box>
          )}

          {isTyping && (
            <Typography variant="body2" sx={{ fontStyle: "italic", color: "#999" }}>Typing...</Typography>
          )}
          {!isTyping && Object.keys(responses).length === 0 && !code && history.length === 0 && (
            <Typography sx={{ color: "#aaa" }}>💬 AI response will appear here...</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", p: 3, borderTop: "1px solid #ddd", bgcolor: "white" }}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your requirements..."
            fullWidth
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} disabled={loading} sx={{ ml: 1 }}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </Box>
      </Box>
{/* 
      <Box sx={{ width: 300, borderLeft: "1px solid #ddd", bgcolor: "#fff", p: 2, overflowY: "auto" }}>
        <WorkspaceContextSidebar
          token={token}
          contextData={contextData}
          setContextData={setContextData}
          projectPath={efsPath}
          packageInfoUrl={packageInfoUrl}
        />
      </Box> */}
    </Box>
  );
};

export default ChatPromptContainer;
