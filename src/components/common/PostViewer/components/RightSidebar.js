import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem } from '@mui/material';

const RightSidebar = ({ postId, comments, setComments }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <Box sx={{ padding: 2, borderLeft: '1px solid #ddd' }}>
      <Typography variant="h6">Comments</Typography>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index}>{comment}</ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={handleAddComment} variant="contained" fullWidth>
        Post
      </Button>
    </Box>
  );
};

export default RightSidebar;
