import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Tooltip, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Save as SaveIcon, Edit as EditIcon, ListAlt as TasksIcon } from '@mui/icons-material';
import { FaBrain, FaRegFileAlt, FaComments } from 'react-icons/fa';
import { getCodeSuggestions } from 'services/codeSuggestionService';
import useAuth from 'hooks/useAuth';

const ToolbarHeader = ({ onAiTutorClick, onTemplatesClick, onSaveClick, onEditClick, onTasksClick, setHtmlCode, setCssCode, setJsCode, htmlCode, cssCode, jsCode }) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const [promptType, setPromptType] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handlePromptIconClick = () => {
    setAccordionOpen(!isAccordionOpen);  // Toggle accordion open/close
  };

  const handleCancel = () => {
    setAccordionOpen(false);
    setCustomPrompt('');  // Clear the custom prompt input
    setPromptType('');  // Reset the dropdown
  };

  const handleSubmit = async () => {
    try {
      const result = await getCodeSuggestions('', customPrompt || promptType, 'HTML, CSS, and JavaScript');
      const { html, css, js } = extractCodeFromResult(result);

      setHtmlCode(html);
      setCssCode(css);
      setJsCode(js);
    } catch (error) {
      console.error('Error generating template:', error);
    }
  };

  const extractCodeFromResult = (result) => {
    const html = result.match(/<html[\s\S]*<\/html>/)?.[0] || '';
    const css = result.match(/<style[\s\S]*<\/style>/)?.[0]?.replace(/<\/?style>/g, '') || '';
    const js = result.match(/<script[\s\S]*<\/script>/)?.[0]?.replace(/<\/?script>/g, '') || '';
    
    return { html, css, js };
  };

  return (
    <Box>
      <AppBar position="static" color="default" sx={{ boxShadow: 3 }}>
        <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={2}>
            {/* AI Tutor */}
            <Tooltip title="AI Tutor" arrow>
              <IconButton onClick={onAiTutorClick}>
                <FaBrain size={24} />
              </IconButton>
            </Tooltip>

            {/* Templates */}
            <Tooltip title="Templates" arrow>
              <IconButton onClick={onTemplatesClick}>
                <FaRegFileAlt size={24} />
              </IconButton>
            </Tooltip>

            {/* Save */}
            <Tooltip title="Save" arrow>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();  // Prevent event propagation
                  e.preventDefault();   // Prevent default behavior
                  onSaveClick();        // Open save modal
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>

            {/* Edit */}
            <Tooltip title="Edit" arrow>
              <IconButton onClick={onEditClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            {/* Prompts */}
            <Tooltip title="Prompts" arrow>
              <IconButton onClick={handlePromptIconClick}>
                <FaComments size={24} />
              </IconButton>
            </Tooltip>

            {/* Tasks */}
            <Tooltip title="Tasks" arrow>
              <IconButton onClick={onTasksClick}>
                <TasksIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Project Builder
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Prompt Accordion */}
      {isAccordionOpen && (
        <Accordion expanded={isAccordionOpen}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="prompt-content" id="prompt-header">
            <Typography>Select a Template or Input Custom Prompt</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth margin="normal">
              <InputLabel>Choose Template</InputLabel>
              <Select
                value={promptType}
                onChange={(e) => setPromptType(e.target.value)}
                label="Choose Template"
              >
                <MenuItem value="blog">Blog Template</MenuItem>
                <MenuItem value="profile">Profile Template</MenuItem>
                <MenuItem value="chat">Chat Template</MenuItem>
                <MenuItem value="custom">Custom Template</MenuItem>
              </Select>
            </FormControl>

            {promptType === 'custom' && (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Enter your custom prompt"
                variant="outlined"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
            )}

            <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
              <Button onClick={handleCancel} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default ToolbarHeader;
