import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import useAuth from "hooks/useAuth";
import WorkspaceContextSidebar from "./WorkspaceContextSidebar";

const ChatPromptContainer = ({ appId, workspaceId, efsPath }) => {
  console.log("efsPath", efsPath)
  const { user, token } = useAuth();
  const [tabs, setTabs] = useState([{ id: "default", name: "default", deletable: false }]);
  const [activeTab, setActiveTab] = useState("default");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [contextData, setContextData] = useState([]);

  const socketRef = useRef(null);
  const partialResponseRef = useRef({});
  const chatContainerRef = useRef(null);
  const currentFilefilePath = useRef(null);

      // ✅ Function to fetch history
      const fetchHistory = async () => {
        if (!appId || !workspaceId) return;
      
        try {
          const res = await fetch(
            `http://localhost:5000/api/assistant/history?app_id=${appId}&workspace_id=${workspaceId}`, // ✅ Pass workspaceId
            {
              method: "GET",
              headers: {
                "UserId": user.id,
              },
            }
          );
      
          const data = await res.json();
          
      
          if (data.history) {
            // ✅ Format history into the same structure as streamed data
            const formattedHistory = data.history.flatMap((item) =>
              item.responses.map((response) => ({
                filePath: response.filePath,
                summary: response.summary,
                documentation: response.documentation,
                content: response.content,
                install: response.install,
                complete: true, // ✅ History is complete by default
              }))
            );
      
            // ✅ Prepend history at the top
            setResponses((prev) => [...formattedHistory, ...prev]);
          }
        } catch (error) {
          console.error("❌ Error fetching history:", error);
        }
      };
      
      // ✅ Load History on Mount
      useEffect(() => {
        if (user.id) {
          fetchHistory(); // ✅ Load history on page load
        }
      }, [user.id, appId, workspaceId]);
  

  useEffect(() => {
    if (!token || !workspaceId) return;

    const socket = io("ws://localhost:5000", {
      transports: ["websocket"],
      query: { token, project_id: appId, workspace_id: workspaceId, efsPath },
    });

    socketRef.current = socket;

    socket.on("connect", () => console.log("✅ Socket connected", socket.id));
    socket.on("connected", (data) => console.log("🟢 Backend confirmed connection:", data));

    socket.on("streamed_response", (data) => {
      const incoming = data.file || {};
      const filePath = incoming.filePath || currentFilefilePath.current;
      if (!filePath) return;

      currentFilefilePath.current = filePath;

      const existing = partialResponseRef.current[filePath] || {
        filePath,
        summary: "",
        documentation: "",
        content: "",
        install: [],
        complete: false,
      };

      if (incoming.summary && !existing.summary.includes(incoming.summary)) {
        existing.summary += incoming.summary;
      }

      if (incoming.documentation && !existing.documentation.includes(incoming.documentation)) {
        existing.documentation += incoming.documentation;
      }

      if (incoming.content && !existing.content.endsWith(incoming.content.trim())) {
        existing.content += incoming.content;
      }
      if (incoming.install && Array.isArray(incoming.install)) {
        const combined = [...(existing.install || []), ...incoming.install];
        // Remove duplicates
        existing.install = [...new Set(combined)];
      }      

      partialResponseRef.current[filePath] = existing;

      setResponses((prev) => {
        const userPrompts = prev.filter((r) => r.isUserPrompt);
        const others = Object.values(partialResponseRef.current);
        return [...userPrompts, ...others];
      });
    });

    socket.on("stream_complete", () => {
        const hasData = Object.keys(partialResponseRef.current).length > 0;
      
        const finalized = hasData
          ? Object.values(partialResponseRef.current).map((r) => ({
              ...r,
              complete: true,
            }))
          : [];
      
        setResponses((prev) => {
          const userPrompts = prev.filter((r) => r.isUserPrompt);
          return [...userPrompts, ...finalized];
        });
      
        partialResponseRef.current = {};
        setLoading(false); // ✅ Always stop loading
      });
      
    socket.on("stream_error", ({ error }) => {
      console.error("❌ Stream error:", error);
      setLoading(false);
    });

    return () => socket.disconnect();
  }, [token, workspaceId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [responses]);

  const handleSend = () => {
    if (!input.trim() || loading || !socketRef.current?.connected) return;
    const prompt = input.trim();

    setResponses((prev) => [...prev, { documentation: prompt, isUserPrompt: true, complete: true }]);
    setLoading(true);
    setInput("");

    socketRef.current.emit("generate_prompt", {
      user_id: user.id,
      prompt,
      app_id: appId,
      workspace_id: workspaceId,
      context_id: "679fd1b69f5fcb1b94f1bbea",
      efsPath: efsPath
    });
  };

  const handleReRun = (prompt) => {
    if (!prompt) return;
    setInput(prompt);
    setTimeout(() => document.getElementById("prompt-input")?.focus(), 100);
  };

  const handleRemoveTab = (tabId) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));
    if (activeTab === tabId) setActiveTab("default");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Tabs Area */}
      <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1, bgcolor: "#fff", borderBottom: "1px solid #ddd" }}>
        {tabs.map((tab) => (
          <Box key={tab.id} sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <Typography
              onClick={() => setActiveTab(tab.id)}
              sx={{ cursor: "pointer", fontWeight: activeTab === tab.id ? "bold" : "normal" }}
            >
              {tab.name}
            </Typography>
            {tab.deletable && (
              <IconButton size="small" onClick={() => handleRemoveTab(tab.id)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
    
      {/* Main Content & Sidebar */}
       <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Chat Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          
          {/* Scrollable Responses Area */}
          <Box ref={chatContainerRef} sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: "#F8F8FB" }}>
            {responses.map((res, idx) => (
              <Box key={idx} sx={{ mb: 2, bgcolor: "#fff", p: 2, borderRadius: 2, boxShadow: 1 }}>
                {res.isUserPrompt ? (
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    User: {res.documentation}
                  </Typography>
                ) : (
                  <>
                    {res.filePath && (
                      <Typography variant="h6" sx={{ color: "#4a90e2", fontWeight: "bold", mb: 1 }}>
                        <ReactMarkdown>{res.filePath}</ReactMarkdown>
                      </Typography>
                    )}
                    {res.summary && (
                      <Typography variant="subfilePath1" sx={{ color: "#666", mb: 1 }}>
                        <ReactMarkdown>{res.summary}</ReactMarkdown>
                      </Typography>
                    )}
                    {res.documentation && (
                      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mb: 1 }}>
                        <ReactMarkdown>{res.documentation}</ReactMarkdown>
                      </Typography>
                    )}
                    {res.content && (
                      <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: "12px", borderRadius: "6px" }}>
                        {res.content}
                      </pre>
                    )}
                    {res.content && res.install && res.install.length > 0 && (
                      <Typography variant="caption" sx={{ mt: 1, display: "block", color: "#444" }}>
                        <strong>Install:</strong> <code>{res.install.join(" ")}</code>
                      </Typography>
                    )}

                    {res.complete && (
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                        <Button size="small" variant="outlined" onClick={() => handleReRun(res.documentation)} sx={{ fontSize: "12px", textTransform: "none" }}>
                          🔄 Re-run
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            ))}
            {loading && <CircularProgress size={20} />}
            {!loading && responses.length === 0 && (
              <Typography sx={{ color: "#aaa" }}>💬 AI Response will appear here...</Typography>
            )}
          </Box>
    
          {/* Always-visible Input Box at Bottom */}
          <Box sx={{ display: "flex", alignItems: "center", p: 3, borderTop: "1px solid #ddd", bgcolor: "white" }}>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your requirements here..."
              fullWidth
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              id="prompt-input"
            />
            <Button onClick={handleSend} disabled={loading} sx={{ ml: 1 }}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </Box>
        </Box>
    
        {/* Sidebar */}
        <Box sx={{ width: 300, borderLeft: "1px solid #ddd", bgcolor: "#fff", p: 2, overflowY: "auto" }}>
          <WorkspaceContextSidebar contextData={contextData} setContextData={setContextData} />
        </Box>
       </Box>
    </Box>


  );
};

export default ChatPromptContainer;
