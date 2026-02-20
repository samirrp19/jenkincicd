import React, { useState } from 'react';
import { Paper, Box, Avatar, TextField, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, Button, Typography, CircularProgress } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import FolderIcon from '@mui/icons-material/Folder';
import WebIcon from '@mui/icons-material/Web';
import DocumentIcon from '@mui/icons-material/Description';
import { ArrowDropDown, AddCircle, CalendarToday, Image, Code } from '@mui/icons-material';
import PostSettingsModal from './PostSettingsModal'; // Import the PostSettings modal
import { getContentSuggestions } from 'services/PostSuggestionService'; // Import the content suggestion service

const PostInputForm = ({ username, token, handleShowModal }) => {
  const [openInputModal, setOpenInputModal] = useState(false);
  const [postSettingsOpen, setPostSettingsOpen] = useState(false);
  const [question, setQuestion] = useState(''); // Store the user input
  const [aiGeneratedContent, setAiGeneratedContent] = useState(''); // Store AI generated content
  const [loading, setLoading] = useState(false); // Loading state for AI request
  const [error, setError] = useState(null); // Error state

  // Handle opening and closing the modals
  const handleOpenInputModal = () => setOpenInputModal(true);
  const handleCloseInputModal = () => setOpenInputModal(false);
  const handleOpenPostSettings = () => setPostSettingsOpen(true);
  const handleClosePostSettings = () => setPostSettingsOpen(false);

  const handleIconClick = (tabIndex) => {
    handleShowModal(tabIndex); // Open the modal with the respective tab (Program, Project, Template, etc.)
  };

  const handleGenerateContent = async () => {
    if (!question) {
      setError('Please enter a question or content prompt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const generatedContent = await getContentSuggestions(username, token, question); // Call the AI content generation service
      setAiGeneratedContent(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
      setError('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        borderRadius: '16px',
        mb: 3,
      }}
    >
      {/* Input box for triggering the main modal */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar
          src="https://via.placeholder.com/40"
          alt={username}
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <TextField
          variant="outlined"
          placeholder={`What do you want to talk about, ${username}?`}
          fullWidth
          sx={{
            padding: '10px 16px',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
          InputProps={{
            readOnly: true,
          }}
          onClick={handleOpenInputModal} // Opens the LinkedIn-like modal on click
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Program Icon with Tooltip */}
        <Tooltip title="Program" arrow>
          <IconButton onClick={() => handleIconClick(0)}>
            <CodeIcon sx={{ color: 'blue' }} />
          </IconButton>
        </Tooltip>

        {/* Project Icon with Tooltip */}
        <Tooltip title="Project" arrow>
          <IconButton onClick={() => handleIconClick(1)}>
            <FolderIcon sx={{ color: 'green' }} />
          </IconButton>
        </Tooltip>

        {/* Template Icon with Tooltip */}
        <Tooltip title="Template" arrow>
          <IconButton onClick={() => handleIconClick(2)}>
            <WebIcon sx={{ color: 'orange' }} />
          </IconButton>
        </Tooltip>

        {/* Document Icon with Tooltip */}
        <Tooltip title="Document" arrow>
          <IconButton onClick={() => handleIconClick(3)}>
            <DocumentIcon sx={{ color: 'brown' }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Main modal for general post input */}
      <Dialog 
        open={openInputModal} 
        onClose={handleCloseInputModal} 
        fullWidth 
        maxWidth="md"
        PaperProps={{
          style: {
            width: '80vw', // Make the modal wider
            height: '100vh', // Full height of the window
            margin: 'auto', // Center it both horizontally and vertically
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Clickable container for avatar, name, and dropdown */}
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={handleOpenPostSettings}
          >
            <Avatar src="https://via.placeholder.com/40" alt={username} sx={{ width: 48, height: 48, mr: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>{username}</Typography>
              <Typography variant="caption">Post to Anyone</Typography>
            </Box>
            <IconButton>
              <ArrowDropDown />
            </IconButton>
          </Box>

          {/* Close button */}
          <IconButton onClick={handleCloseInputModal}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>&times;</span>
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField
            placeholder="What do you want to talk about?"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={question} // Bind the input to state
            onChange={(e) => setQuestion(e.target.value)} // Update state on change
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
            <Tooltip title="Rewrite with AI">
              <Button 
                variant="outlined" 
                startIcon={<AddCircle />} 
                sx={{ marginRight: 2 }}
                onClick={handleGenerateContent} // Generate content on click
                disabled={loading} // Disable button during loading
              >
                {loading ? <CircularProgress size={24} /> : 'Rewrite with AI'}
              </Button>
            </Tooltip>

            {/* Icons for events and other post actions */}
            <Box>
              <Tooltip title="Create Event">
                <IconButton>
                  <CalendarToday />
                </IconButton>
              </Tooltip>
              <Tooltip title="Insert Image">
                <IconButton>
                  <Image />
                </IconButton>
              </Tooltip>
              <Tooltip title="Insert Code">
                <IconButton>
                  <Code />
                </IconButton>
              </Tooltip>
            </Box>

            <Button variant="contained" color="primary">
              Post
            </Button>
          </Box>

          {/* Display AI Generated Content */}
          <Box sx={{ borderTop: '1px solid #ddd', paddingTop: 2, marginTop: 2 }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="subtitle1" color="textSecondary">
                {aiGeneratedContent || 'AI Generated Content will appear here...'}
              </Typography>
            )}
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      {/* Post Settings Modal */}
      <PostSettingsModal open={postSettingsOpen} onClose={handleClosePostSettings} />
    </Paper>
  );
};

export default PostInputForm;
