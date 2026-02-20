import { useEffect } from 'react';
import { io } from 'socket.io-client';

const wsUrl = process.env.REACT_APP_WS_URL;

export const usePostTypeStreamer = (postType, config) => {
  const {
    token, user, appId, workspaceId, workspaceName,
    efsPath, tempEfsPath, setIsTyping, setLoading,
    setResponses, socketRef, partialFilesRef,
    setCode, setChatMessages, prompt,
    programBuffer, selectedLanguage, onCodeGenerated
  } = config;

  useEffect(() => {
    if (!token || !user?.id || !workspaceId) return;

    const socket = io(wsUrl, {
      transports: ['websocket'],
      query: { token, project_id: appId, workspace_id: workspaceId, workspaceName, efsPath }
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log(`✅ Socket connected for ${postType}:`, socket.id);

      socket.emit('socket_id_sync', {
        user_id: user.id,
        app_id: appId,
        workspace_id: workspaceId,
        socket_id: socket.id
      });
    });

    if (postType === 'template') {
      socket.on('template_file_stream', ({ file }) => {
        const { filePath, content = '', install = [] } = file;
        if (!filePath) return;

        const folder = filePath.split('/').slice(0, -1).join('/');
        const fileName = filePath.split('/').pop();

        if (!partialFilesRef.current[folder]) partialFilesRef.current[folder] = {};
        const fileObj = partialFilesRef.current[folder][fileName] || {
          content: '', install: new Set(), complete: false
        };

        if (content && !fileObj.content.endsWith(content.trim())) fileObj.content += content;
        install.forEach(pkg => fileObj.install.add(pkg));

        partialFilesRef.current[folder][fileName] = fileObj;
        setResponses({ ...partialFilesRef.current });
        setIsTyping(true);
      });
    }

    if (postType === 'programming') {
      socket.on('program_file_stream', ({ file }) => {
        if (file?.content) {
          programBuffer.current += file.content;
          setCode(programBuffer.current);
          if (onCodeGenerated) onCodeGenerated(programBuffer.current);
        }
      });
    }

    socket.on('stream_complete', () => {
      setIsTyping?.(false);
      setLoading?.(false);
      if (partialFilesRef?.current) {
        Object.values(partialFilesRef.current).forEach(folder => {
          Object.values(folder).forEach(file => (file.complete = true));
        });
      }
    });

    socket.on('stream_error', ({ error }) => {
      console.error(`❌ ${postType} stream error:`, error);
      setIsTyping?.(false);
      setLoading?.(false);
    });

    return () => socket.disconnect();
  }, [postType, token, workspaceId]);
};
