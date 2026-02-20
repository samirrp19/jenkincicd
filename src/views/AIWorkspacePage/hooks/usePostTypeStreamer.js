import { useEffect } from "react";
import { io } from "socket.io-client";

const wsUrl = process.env.REACT_APP_WS_URL;

const serializePartialFiles = (partialFiles) => {
  const out = {};
  Object.entries(partialFiles || {}).forEach(([folder, files]) => {
    out[folder] = {};
    Object.entries(files || {}).forEach(([name, f]) => {
      out[folder][name] = {
        content: f.content || "",
        install: Array.isArray(f.install)
          ? f.install
          : f.install instanceof Set
          ? Array.from(f.install)
          : [],
        complete: !!f.complete
      };
    });
  });
  return out;
};

// ✅ treat "undefined"/"null" strings as invalid too
const isValidStr = (v) =>
  typeof v === "string" &&
  v.trim().length > 0 &&
  v !== "undefined" &&
  v !== "null";

export const usePostTypeStreamer = (postType, config) => {
  const {
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
  } = config;

  useEffect(() => {
    if (!wsUrl) return;

    // ✅ HARD GUARDS (block "undefined" string also)
    if (!token || !user?.id || !appId || !workspaceId) return;
    if (!isValidStr(workspaceName) || !isValidStr(efsPath)) return;

    // ✅ prevent multiple sockets even while connecting
    if (socketRef.current) return;

    // (optional) ensure clean slate
    try {
      socketRef.current?.off?.();
      socketRef.current?.disconnect?.();
    } catch (e) {}

    const socket = io(wsUrl, {
      transports: ["websocket"],
      // ✅ reduce storm risk; you can re-enable after stability
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1500,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      query: {
        token,
        project_id: appId,
        workspace_id: workspaceId,
        workspaceName,
        efsPath
      }
    });

    socketRef.current = socket;

    const pingTimer = setInterval(() => {
      if (socket.connected) socket.emit("client_ping", { ts: Date.now() });
    }, 15000);

    socket.on("connect", () => {
      console.log(`✅ Socket connected for ${postType}:`, socket.id);

      socket.emit("socket_id_sync", {
        user_id: user.id,
        app_id: appId,
        workspace_id: workspaceId,
        socket_id: socket.id
      });
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect_error:", err?.message || err);
    });

    socket.on("ai_progress", () => {
      setIsTyping?.(true);
    });

    if (isFileStreamingPost) {
      socket.on("template_file_stream", ({ file }) => {
        const { filePath, content = "", install = [] } = file || {};
        if (!filePath) return;

        const folder = filePath.split("/").slice(0, -1).join("/") || "/";
        const fileName = filePath.split("/").pop();

        if (!partialFilesRef.current[folder]) partialFilesRef.current[folder] = {};

        const prev = partialFilesRef.current[folder][fileName] || {
          content: "",
          install: new Set(),
          complete: false
        };

        if (content) prev.content += content;
        if (Array.isArray(install)) install.forEach((pkg) => prev.install.add(pkg));

        partialFilesRef.current[folder][fileName] = prev;

        setResponses(serializePartialFiles(partialFilesRef.current));
        setIsTyping?.(true);
      });
    }

    if (postType === "programming") {
      socket.on("program_file_stream", ({ file }) => {
        if (file?.content) {
          programBuffer.current += file.content;
          setCode(programBuffer.current);
          onCodeGenerated?.(programBuffer.current);
        }
      });
    }

    socket.on("stream_complete", () => {
      setIsTyping?.(false);
      setLoading?.(false);

      if (partialFilesRef?.current) {
        Object.values(partialFilesRef.current).forEach((folder) => {
          Object.values(folder).forEach((f) => (f.complete = true));
        });
        setResponses(serializePartialFiles(partialFilesRef.current));
      }
    });

    socket.on("stream_error", ({ error }) => {
      console.error(`❌ ${postType} stream error:`, error);
      setIsTyping?.(false);
      setLoading?.(false);
    });

    return () => {
      clearInterval(pingTimer);
      try {
        socket.off();
        socket.disconnect();
      } catch (e) {}
      socketRef.current = null;
    };
  }, [
    postType,
    token,
    user?.id,
    appId,
    workspaceId,
    workspaceName,
    efsPath,
    isFileStreamingPost
  ]);
};
