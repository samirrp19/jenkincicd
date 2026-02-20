import React from 'react';
import { Editor } from '@monaco-editor/react';
import '../styles/CodeEditor.css';

const CodeEditor = ({ activeFile, fileContent, handleFileChange }) => {
  // Determine the language mode based on file extension
  const getLanguage = (fileName) => {
    if (fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.css')) return 'css';
    return 'plaintext';
  };

  return (
    <div style={{ backgroundColor: activeFile ? '#1e1e1e' : '#252526', height: '100%' }}>
      {activeFile ? (
        <Editor
          height="100%"
          width="100%"
          language={getLanguage(activeFile)}
          value={fileContent || ''} 
          theme="vs-dark"
          onChange={(value) => handleFileChange(value)}
          options={{ fontSize: 14, automaticLayout: true, minimap: { enabled: false } }}
        />
      ) : (
        <p style={{ color: '#cccccc', textAlign: 'center', paddingTop: '20px' }}>Select a file to edit</p>
      )}
    </div>
  );
};

export default CodeEditor;
