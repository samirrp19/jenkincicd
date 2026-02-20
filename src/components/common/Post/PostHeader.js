import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Public, PersonAdd } from '@mui/icons-material'; // Import PersonAdd for Follow icon

const PostHeader = ({ post }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="https://via.placeholder.com/50" // Replace with actual profile image URL
          alt="User Profile"
          style={{ borderRadius: '50%', width: 50, height: 50, marginRight: 16 }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {post.username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(post.createdAt).toLocaleString('en-US', {
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            <Public fontSize="small" />
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Follow button */}
        <Button
          variant="text"
          startIcon={<PersonAdd />}
          color="primary"
          sx={{ textTransform: 'none', marginRight: 1 }}
        >
          Follow
        </Button>
      </Box>
    </Box>
  );
};

export default PostHeader;
