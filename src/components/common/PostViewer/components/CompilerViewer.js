import React from 'react';
import { Box, Typography } from '@mui/material';
import Editor from '@monaco-editor/react';

const CompilerViewer = ({ post, onPostClick }) => {
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
        <Box sx={{ mt: 2, mb: 2 }}>
          <Editor
            height="200px"
            language={post.language}
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
      </Box>
    </>
  );
};

export default CompilerViewer;
