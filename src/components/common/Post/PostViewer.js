import React, { useState } from 'react';
import { Box, Modal, IconButton, Avatar, TextField, Button, Typography } from '@mui/material';
import { MoreHoriz, Close } from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import Comments from './Comments'; 
import compilerService from '../../../services/compilerService';

const PostViewer = ({ post, open, onClose, username }) => {
  const [output, setOutput] = useState({ stdout: '', stderr: '', error: '' });
  const [standardInput, setStandardInput] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [comment, setComment] = useState('');

  // Handle Compile action
  const executeCode = async () => {
    try {
      const response = await compilerService.executeCode(post.code, post.language, standardInput);
      const { stdout, stderr } = response;
      setOutput({ stdout, stderr, error: '' });
    } catch (error) {
      setOutput({ stdout: '', stderr: '', error: error.message });
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const newComment = { text: comment, username }; // Now we use the passed username
        setComments([...comments, newComment]);
        setComment('');
        // You can add logic here to send the comment to the server using token and postId if needed
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  if (!post) {
    return null; // If no post is selected, do not render
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="post-viewer-modal"
      aria-describedby="post-viewer-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 2,
          width: '80%',
          height: '80vh',
          boxShadow: 24,
        }}
      >
        {/* Left Container: Code Editor */}
        <Box sx={{ width: '60%', pr: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{post.title}</Typography>
          <Editor
            height="500px"
            language={post.language}
            theme="vs-dark"
            value={post.code}
            options={{
              readOnly: false,
              selectOnLineNumbers: true,
              automaticLayout: true,
            }}
          />
          <TextField
            label="Standard Input"
            multiline
            rows={3}
            value={standardInput}
            onChange={(e) => setStandardInput(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Output"
            multiline
            rows={3}
            value={output.stdout || output.stderr || output.error}
            fullWidth
            sx={{ mt: 2 }}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={executeCode}>
            Run
          </Button>
        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            width: '40%',
            backgroundColor: '#f0f0f0',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Avatar src="https://via.placeholder.com/40" /> {/* Replace with actual avatar */}
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          <IconButton>
            <MoreHoriz />
          </IconButton>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined">Like</Button>
            <Button variant="outlined">Comment</Button>
            <Button variant="outlined">WhatsApp</Button>
          </Box>

          <Box sx={{ mt: 2, overflowY: 'auto' }}>
            <Comments comments={comments} />
          </Box>

          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Add a comment"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCommentSubmit();
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PostViewer;
