import React from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import Editor from '@monaco-editor/react';

const PostContent = ({ post, onPostClick }) => {
  return (
    <>
      {/* Clickable title */}
      <Box onClick={onPostClick} sx={{ cursor: 'pointer' }}>
        <Typography
          variant="h6"
          component="a"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {post.title}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          {post.description}
        </Typography>

        {/* Render code editor if postType is program */}
        {post.postType === 'program' && post.code && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Editor
              height="200px"
              language={post.language || 'javascript'}  // Default to JavaScript if language is not provided
              theme="vs-dark"
              value={post.code}
              options={{
                readOnly: true,
                selectOnLineNumbers: true,
                automaticLayout: true,
                lineNumbers: 'on',
                minimap: { enabled: false },
              }}
            />
          </Box>
        )}

        {/* Render template thumbnail if postType is template */}
        {post.postType === 'template' && post.thumbnailUrl && (
          <Card
            sx={{
              mt: 2,
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2, // Add padding to the card
              boxShadow: 3, // Optional shadow for the card
            }}
          >
            <CardMedia
              component="img"
              image={post.thumbnailUrl}  // Display the template thumbnail
              alt={post.title}
              sx={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain', // Ensure the image fits nicely
                padding: 1, // Optional padding around the image
              }}
            />
          </Card>
        )}
      </Box>
    </>
  );
};

export default PostContent;
