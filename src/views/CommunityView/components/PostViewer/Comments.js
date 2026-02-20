import React from 'react';
import { Box, List, ListItem, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';
import gravatar from 'gravatar';

const Comments = ({ comments = [] }) => {
  if (!Array.isArray(comments)) return null; // optional guard for bad data

  return (
    <Box>
      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  src={gravatar.url(comment.username, { s: '40', d: 'identicon' })}
                  sx={{ width: 40, height: 40 }}
                />
              </ListItemAvatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body1" fontWeight="bold">
                  {comment.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.content}
                </Typography>
              </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Comments;
