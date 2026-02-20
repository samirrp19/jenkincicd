import React, { useState } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react'; // Import from @monaco-editor/react
import { Box, Accordion, AccordionSummary, AccordionDetails, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Editor = ({ language, code, onCodeChange }) => {
  const [userInput, setUserInput] = useState(''); // State to store user input

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value); // Update user input
  };

  const handleEditorChange = (value) => {
    onCodeChange(value); // Propagate code changes to the parent component
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Full height of the container
      }}
    >
      {/* Monaco Editor */}
      <Box sx={{ flexGrow: 1 }}>
        <MonacoEditor
          height="400px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange} // Handle code changes
          options={{
            minimap: { enabled: false }, // Disable minimap
            scrollBeyondLastLine: false, // Avoid extra blank lines at the end
            automaticLayout: true, // Automatically adjust layout on resize
          }}
        />
      </Box>

      {/* Accordion for User Input */}
      <Accordion sx={{ mt: 2, borderRadius: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="user-input-content"
          id="user-input-header"
        >
          <Typography>Input Data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Enter the input data for your program below:
          </Typography>
          <TextField
            label="User Input"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={userInput}
            onChange={handleUserInputChange} // Handle input changes
            sx={{ mt: 1 }}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Editor;
