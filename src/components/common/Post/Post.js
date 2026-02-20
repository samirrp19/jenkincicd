import React, { useState } from 'react';
import { Card, Box, Divider, IconButton, Modal, Button, TextField, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MoreHoriz, PlayCircleOutline, Bookmark, Link, Code, Block, PersonRemove, Flag } from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import CommentInput from './CommentInput';
import Comments from './Comments';
import compilerService from '../../../services/compilerService';
import TemplateViewer from './TemplateViewer';

const apiUrl = process.env.REACT_APP_API_URL;

const Post = ({ post, token, username, isGroupPost = false, groupId }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [focusOnComment, setFocusOnComment] = useState(false);
  const [showModal, setShowModal] = useState(false); // TemplateViewer modal state
  const [compileModalOpen, setCompileModalOpen] = useState(false); // Compile modal state
  const [output, setOutput] = useState({ stdout: '', stderr: '', error: '' });
  const [standardInput, setStandardInput] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // Anchor for the menu

  // Handle Like functionality
  const handleLike = async () => {
    try {
      const response = await axios.put(`${apiUrl}/api/likes/${post._id}`, {}, {
        headers: { 'x-auth-token': token }
      });
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  // Handle Comment submission and add to the list instantly
  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const url = isGroupPost
          ? `${apiUrl}/api/comments/${username}/groups/${groupId}/posts/${post._id}`
          : `${apiUrl}/api/comments/${username}/posts/${post._id}`;

        const response = await axios.post(url, { text: comment }, {
          headers: { 'x-auth-token': token }
        });

        setComments([...comments, response.data]);
        setComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Handle opening and closing TemplateViewer modal
  const handleOpenTemplateViewer = () => {
    setShowModal(true);
    window.history.pushState({}, '', `#post-${post._id}`);
  };

  const handleCloseTemplateViewer = () => {
    setShowModal(false);
    window.history.pushState({}, '', `/`);
  };

  // Handle Compile Modal
  const handleCompile = () => {
    setCompileModalOpen(true);
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

  // Handle MoreHoriz Menu Open/Close
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Card variant="outlined" sx={{ mb: 3, borderRadius: '10px' }}>
      {/* Post Header with Compile Icon */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <PostHeader post={post} onPostClick={handleOpenTemplateViewer} /> {/* Trigger TemplateViewer modal */}
        <Box>
          {/* Only display the Compile Icon if postType is 'program' */}
          {post.postType === 'program' && (
            <IconButton onClick={handleCompile}>
              <PlayCircleOutline />
            </IconButton>
          )}
          {/* More Options Icon */}
          <IconButton onClick={handleMenuOpen}>
            <MoreHoriz />
          </IconButton>
        </Box>
      </Box>

      {/* Menu for MoreHoriz */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Bookmark />
          </ListItemIcon>
          <ListItemText>Save</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Link />
          </ListItemIcon>
          <ListItemText>Copy link to post</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Code />
          </ListItemIcon>
          <ListItemText>Embed this post</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Block />
          </ListItemIcon>
          <ListItemText>Not Interested</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PersonRemove />
          </ListItemIcon>
          <ListItemText>Unfollow {username}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Flag />
          </ListItemIcon>
          <ListItemText>Report Post</ListItemText>
        </MenuItem>
      </Menu>

      {/* Post Content */}
      <PostContent post={post} onPostClick={handleOpenTemplateViewer} />

      <Divider />

      {/* Post Actions (Like, Comment) */}
      <PostActions likes={likes} handleLike={handleLike} handleCommentClick={() => setCommentsVisible(!commentsVisible)} />

      {/* Comment Input Section */}
      <CommentInput
        comment={comment}
        handleCommentChange={handleCommentChange}
        handleCommentSubmit={handleCommentSubmit}
        handleKeyPress={handleKeyPress}
        focusOnComment={focusOnComment}
        setFocusOnComment={setFocusOnComment}
        username={username}
      />

      {/* Comments Section */}
      {commentsVisible && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Comments
            postId={post._id}
            token={token}
            comments={comments}
            setComments={setComments}
          />
        </Box>
      )}

      {/* Compile Modal */}
      <Modal
        open={compileModalOpen}
        onClose={() => setCompileModalOpen(false)}
        aria-labelledby="compile-code-modal"
        aria-describedby="modal-to-compile-code"
      >
        <Box
          sx={{
            p: 3,
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '80%',
            margin: 'auto',
            marginTop: '10vh',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <Editor
            height="300px"
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
      </Modal>

      {/* TemplateViewer Modal */}
      <TemplateViewer
        open={showModal}
        onClose={handleCloseTemplateViewer}
        post={post}
        username={username}
        comments={comments}
        token={token}
        handleCommentSubmit={handleCommentSubmit}
        comment={comment}
        setComment={setComment}
      />
    </Card>
  );
};

export default Post;
