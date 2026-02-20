import React, { useState } from 'react';
import { Card, CardContent, Button, Modal, Grid, TextField, Typography, Box } from '@mui/material';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import compilerService from '../../../services/compilerService';
import Comments from '../../../components/common/Post/Comments';

const apiUrl = process.env.REACT_APP_API_URL;

const GroupPost = ({ post, token, username, groupId, onClick }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [showModal, setShowModal] = useState(false);
  const [output, setOutput] = useState({ stdout: '', stderr: '', error: '' });
  const [standardInput, setStandardInput] = useState('');

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/likes/group/${post._id}`,
        {},
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  const handleCompile = () => {
    setShowModal(true);
  };

  const executeCode = async () => {
    try {
      const response = await compilerService.executeCode(post.code, post.language, standardInput);
      const { stdout, stderr } = response;
      setOutput({ stdout, stderr, error: '' });
    } catch (error) {
      setOutput({ stdout: '', stderr: '', error: error.message });
    }
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <img src="https://via.placeholder.com/50" alt="User" style={{ borderRadius: '50%' }} />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6" onClick={onClick} sx={{ cursor: 'pointer', textDecoration: 'none' }}>
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">@{post.username}</Typography>
              <Typography variant="body2" color="textSecondary">{post.description}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ height: '150px', overflow: 'hidden', mt: 2 }}>
            <Editor
              height="150px"
              language={post.language}
              theme="vs-dark"
              value={post.code}
              options={{
                readOnly: true,
                lineNumbers: "on",
                minimap: { enabled: false },
              }}
            />
          </Box>
          <Button onClick={handleCompile} sx={{ mt: 2 }}>Compile</Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleLike}>Like {likes}</Button>
            <Button variant="outlined" onClick={() => setCommentsVisible(!commentsVisible)}>
              {commentsVisible ? 'Hide Comments' : 'Show Comments'}
            </Button>
          </Box>
          {commentsVisible && (
            <Comments postId={post._id} token={token} username={username} isGroupPost={true} groupId={groupId} />
          )}
        </CardContent>
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{ width: 600, margin: 'auto', p: 4, mt: 10, bgcolor: 'background.paper' }}>
          <Typography variant="h6">Compile Code</Typography>
          <Editor
            height="300px"
            language={post.language}
            theme="vs-dark"
            value={post.code}
            options={{ automaticLayout: true }}
          />
          <TextField
            fullWidth
            label="Standard Input"
            multiline
            rows={3}
            value={standardInput}
            onChange={(e) => setStandardInput(e.target.value)}
            sx={{ mt: 3 }}
          />
          <TextField
            fullWidth
            label="Output"
            multiline
            rows={3}
            value={output.stdout || output.stderr || output.error}
            readOnly
            sx={{ mt: 3 }}
          />
          <Button variant="contained" color="primary" onClick={executeCode} sx={{ mt: 2 }}>
            Run
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default GroupPost;
