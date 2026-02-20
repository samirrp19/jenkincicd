import { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const wsUrl = process.env.REACT_APP_WS_CHAT_URL;

const useChatSocket = (token, username) => {
  const socketRef = useRef(null);
  const [chatMessages, setChatMessages] = useState({});
  const [incomingCallPayload, setIncomingCallPayload] = useState(null);

  useEffect(() => {
    if (!username || !token) return;
    if (socketRef.current) return;

    console.log("🧠 Connecting to WebSocket...");
    socketRef.current = io(`${wsUrl}/private`, {
      path: "/socket.io/",
      transports: ['websocket'],
      auth: { token },
    });

    socketRef.current.on("connect", () => {
      console.log("✅ WebSocket connected:", socketRef.current.id);
    });

    // 🗨️ Load previous messages
    socketRef.current.on("previousMessages", (messages) => {
      const updated = {};
      messages.forEach(msg => {
        const key = msg.senderUsername === username ? msg.receiverUsername : msg.senderUsername;
        if (!updated[key]) updated[key] = [];
        updated[key].push(msg);
      });
      setChatMessages(updated);
    });

    // 📩 New message received
    socketRef.current.on("newPrivateMessage", (message) => {
      const key = message.senderUsername === username ? message.receiverUsername : message.senderUsername;
      setChatMessages(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), message],
      }));
    });

    // 📞 Incoming KVS call
    socketRef.current.on("incomingCall", ({ from, callType, avatar, kvsChannelArn }) => {
      console.log("📞 Incoming KVS call from:", from);
      setIncomingCallPayload({ from, callType, avatar, kvsChannelArn });
    });

    // 🔚 Call Ended
    socketRef.current.on("callEnded", () => {
      console.log("📴 Call ended");
      setIncomingCallPayload(null); // clean up
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        console.log("🔌 WebSocket disconnected");
      }
    };
  }, [username, token]);

  // 🧠 Send private message
  const sendMessage = (text, receiverUsername) => {
    if (!socketRef.current?.connected) return;

    const message = {
      messageId: uuidv4(),
      text,
      senderUsername: username,
      receiverUsername,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit('sendPrivateMessage', message);
  };

  // 🎥 Call user via KVS
  const callUser = ({ to, callType, kvsChannelArn, avatar }) => {
    if (!socketRef.current) return;
    socketRef.current.emit('callUser', {
      to,
      from: username,
      callType,
      kvsChannelArn,
      avatar,
    });
  };

  // 📴 End call
  const endCall = (to) => {
    if (socketRef.current) {
      socketRef.current.emit('endCall', { to });
    }
    setIncomingCallPayload(null);
  };

  return {
    chatMessages,
    sendMessage,
    socketRef,
    callUser,
    endCall,
    incomingCallPayload,
    setIncomingCallPayload,
  };
};

export default useChatSocket;
