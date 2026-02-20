import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import CreatePostModal from './Post/CreatePostModal';
import LoadingGame from 'components/common/Game/LoadingGame';
import { CircularProgress, Tooltip, IconButton } from "@mui/material";
import {
  FiberManualRecord, Stop, Close, PostAdd,
  CloudUpload, Download, CameraAlt
} from "@mui/icons-material";

const apiUrl = process.env.REACT_APP_API_URL;

const AppViewer = ({
  open,
  toggleAppViewer,
  compiledAppUrl,
  token,
  userId,
  username,
  projectId,
  templateId,
  workspace,
  currentIndex,
  setCurrentIndex,
  setScreenshotList,
  setPreviewImage
}) => {
  const iframeRef = useRef(null);
  const scrollRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [recordingFilename, setRecordingFilename] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [screenshotListLocal, setScreenshotListLocal] = useState([]);

  useEffect(() => {
    let pollTimer = null;
    let stopwatch = null;

    const pollStatus = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/projects/${username}/projects/ai/${projectId}/ws/${templateId}/status`, {
          headers: { "x-auth-token": token },
        });

        if (data?.status === "ready") {
          clearInterval(pollTimer);
          clearInterval(stopwatch);
          setIsReady(true);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      } catch (err) {
        console.error("❌ Poll error:", err.message);
      }
    };

    if (open && projectId && templateId) {
      setIsReady(false);
      pollStatus(); // fire immediately
      pollTimer = setInterval(pollStatus, 3000);
      stopwatch = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    }

    return () => {
      clearInterval(pollTimer);
      clearInterval(stopwatch);
      setElapsed(0);
    };
  }, [open, templateId, projectId]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== new URL(compiledAppUrl).origin) return;
      const { type, blob } = event.data;

      if (type === "recording-complete") {
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setRecording(false);
        setRecordingFilename(`recording-${userId}-${Date.now()}.webm`);
      }

      if (type === "screenshot-captured") {
        const preview = URL.createObjectURL(blob);
        const filename = `screenshot-${userId}-${Date.now()}.png`;
        const newItem = { preview, s3Url: null };
        const updated = [...screenshotListLocal, newItem];
        setScreenshotListLocal(updated);

        const formData = new FormData();
        formData.append("filename", filename);
        formData.append("userId", userId);
        formData.append("projectId", projectId);
        formData.append("templateId", templateId);
        formData.append("file", blob);

        axios.post(`${apiUrl}/api/recordings/upload`, formData).then(({ data }) => {
          const s3Url = data?.recording?.s3Url;
          if (s3Url) {
            const newList = updated.map((item, i) =>
              i === updated.length - 1 ? { ...item, s3Url } : item
            );
            setScreenshotListLocal(newList);
            setScreenshotList?.(newList);
          }
        }).catch(err => console.error("❌ Screenshot upload failed:", err.message));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [compiledAppUrl, userId]);

  const sendAction = (action) => {
    iframeRef.current?.contentWindow?.postMessage({ action }, compiledAppUrl);
  };

  const startRecording = () => {
    setRecording(true);
    setVideoUrl(null);
    setRecordingFilename(null);
    sendAction("start-recording");
  };

  const stopRecording = () => sendAction("stop-recording");

  const uploadRecording = async () => {
    if (!videoUrl || !recordingFilename) return;
    setUploading(true);
    try {
      const blob = await (await fetch(videoUrl)).blob();
      const formData = new FormData();
      formData.append("filename", recordingFilename);
      formData.append("userId", userId);
      formData.append("file", blob);
      formData.append("projectId", projectId);
      formData.append("templateId", templateId);

      await axios.post(`${apiUrl}/api/recordings/upload`, formData);
      alert("✅ Uploaded to S3!");
      setVideoUrl(null);
    } catch (err) {
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const downloadRecording = () => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = recordingFilename || "recording.webm";
    a.click();
  };

  const scrollThumbnails = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 120, behavior: "smooth" });
  };

  return (
    <div style={{ ...styles.drawer, transform: open ? "translateX(0)" : "translateX(100%)" }}>
      {/* ⏳ Loading screen */}
      {isLoading && !isReady && (
        <div style={styles.loadingOverlay}>
          <CircularProgress style={styles.loader} />
          <div>Preparing your app...</div>
          <div style={styles.loadTime}>⏱️ {elapsed}s elapsed</div>
          <div style={{ marginTop: 20 }}>
            <LoadingGame />
          </div>
        </div>
      )}

      {/* 🔧 Toolbar */}
      <div style={styles.header}>
        <Tooltip title="Create Post"><IconButton style={styles.iconButton} onClick={() => setModalOpen(true)}><PostAdd /></IconButton></Tooltip>
        <Tooltip title="Screenshot"><IconButton style={styles.iconButton} onClick={() => sendAction("capture-screenshot")}><CameraAlt /></IconButton></Tooltip>
        {!recording ? (
          <Tooltip title="Start Recording"><IconButton style={styles.iconButton} onClick={startRecording}><FiberManualRecord /></IconButton></Tooltip>
        ) : (
          <Tooltip title="Stop Recording"><IconButton style={styles.iconButton} onClick={stopRecording}><Stop /></IconButton></Tooltip>
        )}
        {videoUrl && (
          <>
            <Tooltip title="Upload Recording"><IconButton style={styles.iconButton} disabled={uploading} onClick={uploadRecording}><CloudUpload /></IconButton></Tooltip>
            <Tooltip title="Download Recording"><IconButton style={styles.iconButton} onClick={downloadRecording}><Download /></IconButton></Tooltip>
          </>
        )}
        <Tooltip title="Close Viewer"><IconButton style={styles.iconButton} onClick={toggleAppViewer}><Close /></IconButton></Tooltip>
      </div>

      {isReady && (
        <iframe
          ref={iframeRef}
          src={compiledAppUrl}
          title="Compiled App"
          style={styles.iframe}
          sandbox="allow-scripts allow-same-origin"
        />
      )}

      {!!screenshotListLocal.length && (
        <div style={styles.screenshotFooter}>
          <button style={styles.arrowBtn} onClick={() => scrollThumbnails(-1)}>⟨</button>
          <div style={styles.screenshotScroll} ref={scrollRef}>
            {screenshotListLocal.map((s, i) => (
              <img
                key={i}
                src={s.preview}
                style={{
                  ...styles.screenshotThumb,
                  border: i === currentIndex ? "2px solid #00f" : "2px solid #555"
                }}
                onClick={() => {
                  setCurrentIndex(i);
                  setPreviewImage(s);
                }}
              />
            ))}
          </div>
          <button style={styles.arrowBtn} onClick={() => scrollThumbnails(1)}>⟩</button>
        </div>
      )}

      <CreatePostModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        token={token}
        username={username}
        userId={userId}
        projectId={projectId}
        workspace={workspace}
        templateId={templateId}
      />
    </div>
  );
};

const styles = {
  drawer: {
    position: "fixed", top: 0, right: 0, height: "100vh", width: "50%",
    backgroundColor: "#1e1e1e", borderLeft: "1px solid #ccc", zIndex: 9999,
    display: "flex", flexDirection: "column", transition: "transform 0.3s ease-in-out"
  },
  header: {
    backgroundColor: "#333", padding: 10,
    display: "flex", justifyContent: "center", gap: 10
  },
  iconButton: { color: "#fff" },
  iframe: { flex: 1, border: "none", width: "100%", background: "#fff" },
  videoPreview: { width: "100%", height: "200px", marginTop: 10 },
  screenshotFooter: {
    background: "#222", padding: 10,
    borderTop: "1px solid #444", display: "flex",
    alignItems: "center", justifyContent: "center"
  },
  screenshotScroll: {
    display: "flex", gap: 8, overflowX: "auto", maxWidth: "80%"
  },
  screenshotThumb: {
    width: 100, height: 60, objectFit: "cover",
    cursor: "pointer", borderRadius: 4
  },
  arrowBtn: {
    background: "transparent", color: "#fff",
    fontSize: "1.5rem", border: "none", cursor: "pointer"
  },
  loadingOverlay: {
    position: "absolute", top: "60px", left: 0, right: 0, bottom: 0,
    background: "rgba(30,30,30,0.95)", color: "#fff",
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", zIndex: 10000
  },
  loader: { marginBottom: "10px" },
  loadTime: {
    marginTop: "4px", fontSize: "0.9rem", color: "#bbb"
  }
};

export default AppViewer;
