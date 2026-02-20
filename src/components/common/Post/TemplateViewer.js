import React, {useState} from 'react';
import { Modal, Box, IconButton, Avatar, Typography, Divider, TextField } from '@mui/material';
import { Close, Notifications, Message, MoreHoriz } from '@mui/icons-material';
import PostContent from './PostContent'; // Reuse PostContent
import CommentInput from './CommentInput';
import Comments from './Comments';

const TemplateViewer = ({ open, onClose, post, username, comments, token, handleCommentSubmit, comment, setComment }) => {
  const [focusOnComment, setFocusOnComment] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#fff' }}>
        {/* First Column: Post Content */}
        <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', padding: '20px', position: 'relative' }}>
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 20, left: 20 }}>
            <Close />
          </IconButton>
          <Box sx={{ marginTop: 10 }}>
            <PostContent post={post} />
          </Box>
        </Box>

        {/* Second Column: User Interactions */}
        <Box sx={{ flex: 1, padding: '20px', position: 'relative', backgroundColor: '#fff' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton>
              <Message />
            </IconButton>
            <IconButton>
              <Notifications />
            </IconButton>
            <Avatar src="/path-to-user-avatar" alt={username} sx={{ width: 40, height: 40, marginLeft: '10px' }} />
          </Box>

          {/* Second Header: Post Owner Info */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={post.userAvatar} alt={post.username} sx={{ width: 40, height: 40, marginRight: '10px' }} />
              <Typography variant="h6">{post.username}</Typography>
            </Box>
            <IconButton>
              <MoreHoriz />
            </IconButton>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 2 }} />

          {/* Main Content: Comments */}
          <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: '60vh' }}>
            <Comments postId={post._id} token={token} comments={comments} />
          </Box>

          {/* Comment Input Section */}
          <Box sx={{ marginTop: '20px' }}>
            <CommentInput
              comment={comment}
              handleCommentChange={(e) => setComment(e.target.value)}
              handleCommentSubmit={handleCommentSubmit}
              handleKeyPress={handleKeyPress}
              focusOnComment={focusOnComment}
              setFocusOnComment={setFocusOnComment}
              username={username}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TemplateViewer;
