import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const ProfilePosts = ({ posts }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {posts.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No posts yet.
        </Typography>
      ) : (
        posts.map((post, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1">{post.content}</Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default ProfilePosts;
