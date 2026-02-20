import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ChatMainContent = ({ selectedUser, currentUser, messages }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '16px',
        overflowY: 'auto',
        backgroundColor: '#f5f7fa'
      }}
    >
      {messages.length === 0 ? (
        <Typography color="textSecondary" align="center">
          Start the conversation with {selectedUser?.username}
        </Typography>
      ) : (
        messages.map((msg) => {
          const isSender = msg.senderUsername === currentUser;
          return (
            <Box
              key={msg.messageId || `${msg.timestamp}-${msg.text}`}
              sx={{
                display: 'flex',
                justifyContent: isSender ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  padding: '10px 14px',
                  maxWidth: '65%',
                  backgroundColor: isSender ? '#1976d2' : '#e0e0e0',
                  color: isSender ? '#fff' : '#000',
                  borderRadius: '10px',
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
            </Box>
          );
        })
      )}
      <div ref={chatEndRef} />
    </Box>
  );
};

export default ChatMainContent;
