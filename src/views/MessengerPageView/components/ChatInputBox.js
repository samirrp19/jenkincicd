import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

const ChatInputBox = ({ selectedUser, sendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || !selectedUser) return;
    sendMessage(input.trim(), selectedUser.username);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fff'
      }}
    >
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={4}
        variant="outlined"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton><InsertEmoticonIcon /></IconButton>
              <IconButton><AttachFileIcon /></IconButton>
              <IconButton><ImageIcon /></IconButton>
            </InputAdornment>
          ),
        }}
      />
      <IconButton color="primary" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInputBox;
