import React from 'react';
import { Box } from '@mui/material';
import EditorHeader from '../editor/EditorHeader';
import Editor from '../editor/Editor';
import EditorFooter from '../editor/EditorFooter';

const MonacoEditorComponent = ({ language, onLanguageChange, code, onChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: 'white',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <EditorHeader language={language} onLanguageChange={onLanguageChange} />
      </Box>

      {/* Editor */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        <Editor language={language} code={code} onChange={onChange} />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
          backgroundColor: 'white',
          boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <EditorFooter />
      </Box>
    </Box>
  );
};

export default MonacoEditorComponent;
