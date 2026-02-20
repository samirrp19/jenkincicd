import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import useAuth from "hooks/useAuth";
import WorkspaceContextSidebar from "./components/WorkspaceContextSidebar";
import ImagePreviewModal from "./components/ImagePreviewModal";
import VideoPreviewModal from "./components/VideoPreviewModal";
import { usePostTypeStreamer } from "./hooks/usePostTypeStreamer";

const oneaiUrl = process.env.REACT_APP_OPENAPI_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const isImage = (filename) => /\.(png|jpe?g|gif|bmp|webp|svg)$/i.test(filename);

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [attachedAssets, setAttachedAssets] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [previewVideoUrl, setPreviewVideoUrl] = useState(null);

  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);
  const partialFilesRef = useRef({});
  const programBuffer = useRef("");

  const packageInfoUrl = `${apiUrl}/api/projects/${user?.username}/projects/ai/${appId}/ws/packages`;

  // ✅ Treat "app" same as "template" for code streaming UI
  // If your app postType is actually "frontend" or "reacttemplate", add it here.
  const isFileStreamingPost =
    postType === "template" ||
    postType === "app" ||
    postType === "frontend" ||
    postType === "reacttemplate";

  usePostTypeStreamer(postType, {
    token,
    user,
    appId,
    workspaceId,
    workspaceName,
    efsPath,
    tempEfsPath,
    setIsTyping,
    setLoading,
    setResponses,
    socketRef,
    partialFilesRef,
    setCode,
    programBuffer,
    selectedLanguage,
    onCodeGenerated,
    isFileStreamingPost
  });

  const fetchHistory = async () => {
    if (!appId || !workspaceId || !user?.id) return;

    try {
      const res = await fetch(
        `${oneaiUrl}/api/assistant/history?app_id=${appId}&workspace_id=${workspaceId}`,
        { headers: { "UserId": user.id } }
      );
      const data = await res.json();

      if (data.history) {
        const formatted = data.history.map((item) => ({
          prompt: item.prompt,
          created_at: item.created_at?.$date || item.created_at,
          prompt_assets: item.context_assets || [],
          responses: (item.responses || []).map((resp) => ({
            model_name: resp.model_name,
            created_at: resp.created_at?.$date || resp.created_at,
            files: (resp.files || []).map((file) => {
              const imageCheck = /\.(png|jpe?g|gif|bmp|webp|svg)$/i.test(file.file_path);
              const isPDF = /\.pdf$/i.test(file.file_path);
              const fileType = imageCheck ? "image" : isPDF ? "pdf" : "code";

              return {
                file_path: file.file_path,
                content: file.content,
                install: file.install || [],
                created_at: file.created_at?.$date || file.created_at,
                type: fileType,
                previewUrl: imageCheck ? file.file_path : null
              };
            })
          }))
        }));
        setHistory(formatted);
      }
    } catch (err) {
      console.error("❌ Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, appId, workspaceId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [responses, code, history.length, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // ✅ allow send even if socket temporarily reconnecting, but avoid if no socket at all
    if (!socketRef.current) return;

    const prompt = input.trim();

    setLoading(true);
    setInput("");
    setLastPrompt(prompt);
    setIsTyping(true);

    // reset streaming buffers
    partialFilesRef.current = {};
    programBuffer.current = "";
    setResponses({});
    setCode("");

    // 🖼️ image command
    if (prompt.startsWith("/image")) {
      const imagePrompt = prompt.replace("/image", "").trim();
      try {
        const res = await fetch(`${oneaiUrl}/api/story/image/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "UserId": user.id,
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ prompt: imagePrompt })
        });

        const data = await res.json();
        if (data?.url) {
          setAttachedAssets([
            {
              type: "image",
              url: data.url,
              source: data.source,
              name: "generated-image.png"
            }
          ]);
        } else {
          console.error("Image generation failed:", data.error);
        }
      } catch (err) {
        console.error("❌ Error during image generation:", err);
      } finally {
        setIsTyping(false);
        setLoading(false);
      }
      return;
    }

    // 🎥 story block unchanged
    if (postType === "story") {
      try {
        const res = await fetch(`${oneaiUrl}/api/story/generate/story-video`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            prompt,
            user_id: user.id,
            efs_path: efsPath,
            project_id: appId,
            workspace_id: workspaceId,
            project_path: efsPath
          })
        });

        const data = await res.json();
        const storyId = data?.story_id;
        const videoData = data?.video_trigger_response;
        const videoUrl = videoData?.videoPath;
        const createdAt = videoData?.timestamp;

        if (!storyId || !videoUrl) throw new Error("Missing story ID or video path in response");

        setResponses({
          ["story-video.mp4"]: {
            type: "video",
            url: videoUrl,
            created_at: new Date(createdAt).getTime() || Date.now()
          }
        });
      } catch (err) {
        console.error("❌ Error generating or fetching story video:", err);
        setResponses({
          error: { type: "error", message: err.message || "Failed to generate story video" }
        });
      } finally {
        setIsTyping(false);
        setLoading(false);
      }
      return;
    }

    // 🎮 game block unchanged
    if (postType === "game") {
      try {
        const res = await fetch(`${oneaiUrl}/api/game/generate/game-project`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            prompt,
            user_id: user.id,
            project_id: appId,
            workspace_id: workspaceId,
            efs_path: efsPath
          })
        });

        const data = await res.json();
        if (data?.config_url) {
          setResponses({
            game_config: {
              type: "config",
              url: data.config_url,
              audio: data.audio_url,
              created_at: Date.now()
            }
          });
        } else {
          setResponses({
            error: { type: "error", message: data.error || "No config_url returned from backend" }
          });
        }
      } catch (err) {
        console.error("❌ Error generating game:", err);
        setResponses({
          error: { type: "error", message: err.message || "Request failed" }
        });
      } finally {
        setIsTyping(false);
        setLoading(false);
      }
      return;
    }

    // ✅ normal code generation (apps/templates follow same event: generate_prompt)
    const eventName = postType === "programming" ? "generate_program_prompt" : "generate_prompt";

    const payload =
      postType === "programming"
        ? {
            user_id: user.id,
            prompt,
            app_id: appId,
            workspace_id: workspaceId,
            framework: selectedLanguage,
            podcast_enabled: podcastEnabled,
            documentation_enabled: documentationEnabled,
            context_assets: attachedAssets
          }
        : {
            user_id: user.id,
            token,
            prompt,
            app_id: appId,
            workspace_id: workspaceId,
            workspaceName,
            efsPath,
            tempEfsPath,
            podcast_enabled: podcastEnabled,
            documentation_enabled: documentationEnabled,
            context_assets: attachedAssets
          };

    socketRef.current.emit(eventName, payload);
    setAttachedAssets([]);
  };

  const handleAttachClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleFileUpload = () => {
    document.getElementById("file-upload").click();
    handleClose();
  };

  const handleImageUpload = () => {
    document.getElementById("image-upload").click();
    handleClose();
  };

  const handleVideoClick = (url) => {
    setPreviewVideoUrl(url);
    setVideoModalOpen(true);
  };

  const uploadToS3 = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${apiUrl}/api/uploads/s3`, {
        method: "POST",
        headers: { "x-auth-token": token },
        body: formData
      });

      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data?.message || "Upload failed");
      return data.url;
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Failed to upload file. Please try again.");
      return null;
    }
  };

  const handleImageClick = (url) => {
    setPreviewImageUrl(url);
    setImageModalOpen(true);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Box ref={chatContainerRef} sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: "#F9F9FB" }}>
          {/* 🕘 history unchanged */}
          {history.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                🕘 Past Responses
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {history.map((entry, index) => (
                <Box key={`entry-${index}`} sx={{ mb: 4 }}>
                  <Box sx={{ mb: 2, p: 2, bgcolor: "#f3f6f9", borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                      Prompt:
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {entry.prompt}
                    </Typography>

                    {entry.prompt_assets?.length > 0 && (
                      <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                        {entry.prompt_assets.map((asset, idx) =>
                          asset.type === "image" ? (
                            <Box
                              key={idx}
                              sx={{ width: 80, height: 80, borderRadius: 1, overflow: "hidden", boxShadow: 1 }}
                            >
                              <img
                                src={asset.url}
                                alt="Generated"
                                onClick={() => handleImageClick(asset.url)}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  objectFit: "cover",
                                  border: "1px solid #ccc"
                                }}
                              />
                            </Box>
                          ) : (
                            <Box key={idx} sx={{ mt: 1 }}>
                              📎{" "}
                              <a href={asset.url} target="_blank" rel="noopener noreferrer">
                                Attached File
                              </a>
                            </Box>
                          )
                        )}
                      </Box>
                    )}
                  </Box>

                  {entry.responses.map((response, rIdx) => (
                    <Box key={`response-${rIdx}`} sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ color: "#666", mb: 1 }}>
                        Model: {response.model_name} — {new Date(response.created_at).toLocaleString()}
                      </Typography>

                      {response.files.map((file, fIdx) => (
                        <Box key={`file-${fIdx}`} sx={{ mb: 2 }}>
                          {isImage(file.file_path) ? (
                            <Box
                              component="img"
                              src={file.file_path}
                              alt={`asset-${fIdx}`}
                              onClick={() => window.open(file.file_path, "_blank")}
                              sx={{
                                width: 150,
                                height: 150,
                                borderRadius: 2,
                                objectFit: "cover",
                                cursor: "pointer",
                                boxShadow: 2
                              }}
                            />
                          ) : (
                            <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
                              <Typography variant="h6" sx={{ color: "#4a90e2", mb: 1 }}>
                                📄 {file.file_path}
                              </Typography>
                              {file.install?.length > 0 && (
                                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                                  <strong>Install:</strong> <code>{file.install.join(" ")}</code>
                                </Typography>
                              )}
                              <pre
                                style={{
                                  whiteSpace: "pre-wrap",
                                  background: "#f6f6f6",
                                  padding: "12px",
                                  borderRadius: "6px"
                                }}
                              >
                                {file.content}
                              </pre>
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          )}

          {/* 🧑‍💻 Last prompt */}
          {lastPrompt && (
            <Box sx={{ mb: 3, p: 2, bgcolor: "#e8f0fe", borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#1a73e8", mb: 1 }}>
                🧑‍💻 You Asked:
              </Typography>
              <Typography variant="body1">{lastPrompt}</Typography>

              {attachedAssets.length > 0 && (
                <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
                  {attachedAssets.map((asset, i) =>
                    asset.type === "image" ? (
                      <Box
                        key={i}
                        sx={{
                          maxWidth: 300,
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: 2,
                          cursor: "pointer",
                          "&:hover": {
                            opacity: 0.9,
                            transform: "scale(1.01)",
                            transition: "all 0.2s ease-in-out"
                          }
                        }}
                        onClick={() => handleImageClick(asset.url)}
                      >
                        <img
                          src={asset.url}
                          alt={`attachment-${i}`}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            display: "block"
                          }}
                        />
                      </Box>
                    ) : (
                      <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        📎{" "}
                        <a href={asset.url} target="_blank" rel="noopener noreferrer">
                          Attached File
                        </a>
                      </Box>
                    )
                  )}
                </Box>
              )}
            </Box>
          )}

          {/* ✅ STREAMED FILES (Template + App + Frontend) */}
          {isFileStreamingPost &&
            Object.entries(responses).map(([folder, files]) => (
              <Box key={folder} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                  📁 {folder}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(files).map(([filename, fileObj]) => (
                  <Box key={filename} sx={{ mb: 2, p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
                    <Typography variant="h6" sx={{ color: "#4a90e2", mb: 1 }}>
                      {filename}
                    </Typography>

                    {Array.isArray(fileObj.install) && fileObj.install.length > 0 && (
                      <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                        <strong>Install:</strong> <code>{fileObj.install.join(" ")}</code>
                      </Typography>
                    )}

                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        background: "#f6f6f6",
                        padding: "12px",
                        borderRadius: "6px"
                      }}
                    >
                      {fileObj.content}
                    </pre>

                    {fileObj.complete && (
                      <Typography variant="caption" sx={{ color: "#4caf50" }}>
                        ✅ Complete
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            ))}

          {/* Programming output */}
          {postType === "programming" && code && (
            <Box sx={{ mb: 2, p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ color: "#4a90e2", mb: 1 }}>
                📄 main.{selectedLanguage}
              </Typography>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#f6f6f6",
                  padding: "12px",
                  borderRadius: "6px"
                }}
              >
                {code}
              </pre>
            </Box>
          )}

          {/* Errors */}
          {responses?.error?.type === "error" && (
            <Box sx={{ p: 2, bgcolor: "#fff3f3", border: "1px solid #f99", borderRadius: 2, mt: 2 }}>
              <Typography variant="h6" sx={{ color: "#c00" }}>
                ❌ Error
              </Typography>
              <Typography variant="body2">{responses.error.message}</Typography>
            </Box>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" sx={{ fontStyle: "italic", color: "#999" }}>
                Generating... ⏳
              </Typography>
            </Box>
          )}

          {!isTyping && Object.keys(responses).length === 0 && !code && history.length === 0 && (
            <Typography sx={{ color: "#aaa" }}>💬 AI response will appear here...</Typography>
          )}
        </Box>

        {/* Input */}
        <Box sx={{ p: 3, borderTop: "1px solid #ddd", bgcolor: "white" }}>
          {attachedAssets.length > 0 && (
            <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
              {attachedAssets.map((asset, i) =>
                asset.type === "image" ? (
                  <Box key={i} sx={{ width: 60, height: 60, borderRadius: 1, overflow: "hidden", boxShadow: 1 }}>
                    <img
                      src={asset.preview || asset.url}
                      alt={`preview-${i}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ) : (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    📎 <Typography variant="body2">File attached</Typography>
                  </Box>
                )
              )}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              multiline
              minRows={1}
              maxRows={10}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your requirements..."
              fullWidth
              sx={{ "& .MuiInputBase-root": { overflowY: "auto" } }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            {/* hidden inputs */}
            <input
              type="file"
              id="file-upload"
              hidden
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = await uploadToS3(file);
                if (!url) return;
                setAttachedAssets((prev) => [
                  ...prev,
                  { type: "file", url, preview: URL.createObjectURL(file) }
                ]);
              }}
            />

            <input
              type="file"
              id="image-upload"
              accept="image/*"
              hidden
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const objectUrl = URL.createObjectURL(file);
                const url = await uploadToS3(file);
                if (!url) return;
                setAttachedAssets((prev) => [...prev, { type: "image", url, preview: objectUrl }]);
              }}
            />

            <IconButton onClick={handleAttachClick}>
              <AttachFileIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleFileUpload}>
                <AttachFileIcon sx={{ mr: 1 }} /> Attach File
              </MenuItem>
              <MenuItem onClick={handleImageUpload}>
                <ImageIcon sx={{ mr: 1 }} /> Attach Image
              </MenuItem>
            </Menu>

            <Button onClick={handleSend} disabled={loading} sx={{ ml: 1 }}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Right sidebar */}
      <Box sx={{ width: 300, borderLeft: "1px solid #ddd", bgcolor: "#fff", p: 2, overflowY: "auto" }}>
        <WorkspaceContextSidebar
          token={token}
          username={user?.username}
          projectId={appId}
          workspaceId={workspaceId}
          contextData={contextData}
          setContextData={setContextData}
          projectPath={efsPath}
          packageInfoUrl={packageInfoUrl}
        />
      </Box>

      <ImagePreviewModal open={imageModalOpen} onClose={() => setImageModalOpen(false)} imageUrl={previewImageUrl} />
      <VideoPreviewModal open={videoModalOpen} onClose={() => setVideoModalOpen(false)} videoUrl={previewVideoUrl} />
    </Box>
  );
};

export default ChatPromptContainer;
