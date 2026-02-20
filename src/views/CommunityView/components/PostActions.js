import React from 'react';
import { CardActions, IconButton, Typography } from '@mui/material';
import { FavoriteBorder, ChatBubbleOutline, Share } from '@mui/icons-material';

const PostActions = ({ likes, handleLike, handleCommentClick }) => {
  return (
    <CardActions sx={{ justifyContent: 'space-between', paddingX: 2 }}>
      <IconButton onClick={handleLike}>
        <FavoriteBorder />
        <Typography variant="body2" sx={{ ml: 1 }}>
          {likes}
        </Typography>
      </IconButton>
      <IconButton onClick={handleCommentClick}>
        <ChatBubbleOutline />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Comment
        </Typography>
      </IconButton>
      <IconButton>
        <Share />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Share
        </Typography>
      </IconButton>
    </CardActions>
  );
};

export default PostActions;
