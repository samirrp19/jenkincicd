// hooks/useLanguageSocket.js
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const wsUrl = process.env.REACT_APP_WS_URL;

export default function useLanguageSocket({ token, userId, setCode, setLoading, programBuffer }) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token || !userId) return;

    const socket = io(wsUrl, {
      transports: ['websocket'],
      query: { token },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Connected to Socket.IO:', socket.id);
    });

    socket.on('program_file_stream', ({ file }) => {
      if (file?.content) {
        programBuffer.current += file.content;
        setCode(programBuffer.current);
      }
    });

    socket.on('stream_complete', () => {
      console.log('✅ AI Stream complete');
      setLoading(false);
    });

    socket.on('stream_error', ({ error }) => {
      console.error('❌ Stream error:', error);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, userId]);

  const emitProgramPrompt = (prompt, language) => {
    if (!socketRef.current?.connected) {
      console.error("❌ Socket not connected");
      return;
    }

    programBuffer.current = '';
    setCode('');
    setLoading(true);

    socketRef.current.emit('generate_program_prompt', {
      user_id: userId,
      prompt,
      framework: language,
    });
  };

  return { emitProgramPrompt };
}
