import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("https://api.learntute.com", {
      auth: { userId }, // Pass userId during connection handshake
    });

    socket.on("connect", () => {
      console.log("✅ WebSocket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ WebSocket disconnected");
    });

    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  }
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
