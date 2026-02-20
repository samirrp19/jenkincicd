import React from 'react';
import { AppBar, Toolbar, Box, TextField, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
// Import subcomponents for each dropdown and section
import FileMenu from './FileMenu';
import EditMenu from './EditMenu';
import ViewMenu from './ViewMenu';
import AIDropdown from './AIDropdown';
import RunButton from './RunButton';
import MoreOptions from './MoreOptions';
import WindowControls from './WindowControls';
import useAuth from 'hooks/useAuth';  // Assuming you have a useAuth hook

const AIToolbarHeader = ({ toggleAppViewer, saveSettings }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Extract the username from the authentication hook
  const username = user ? user.username : null; // Get the username

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#1e1e1e',
        height: '35px', // Fixed height for consistency
        zIndex: 1200, // Ensure it stays above other elements
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          minHeight: '35px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 16px', // Control padding inside toolbar
        }}
      >
        {/* Logo / Icon */}
        <Box onClick={() => navigate(`/${username}/projects`)} style={{ cursor: "pointer" }}>
          <img src="/icon.svg" alt="VS Code Icon" style={{ height: "20px" }} />
        </Box>
        <Box>
          {/* Dropdown Menus */}
          <FileMenu />
          <EditMenu />
          <ViewMenu toggleAppViewer={toggleAppViewer} />
          <AIDropdown onPostTypeChange={saveSettings} />
          <RunButton />

          {/* More Options */}
          <MoreOptions />

          {/* Navigation Arrows */}
          <IconButton size="small" sx={{ color: '#d4d4d4' }}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: '#d4d4d4' }}>
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>

        {/* Right Side: Search and Window Controls */}
        <Box display="flex" alignItems="center" gap={1.5}>
          {/* Search Input */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            sx={{
              height: '32px', // Align with icon heights
              backgroundColor: '#333',
              '& .MuiOutlinedInput-root': {
                color: '#d4d4d4',
                borderColor: '#3c3c3c',
                height: '32px', // Ensures input height is consistent
              },
              '& .MuiOutlinedInput-input': {
                padding: '5px 10px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
            InputProps={{
              endAdornment: <span style={{ color: '#d4d4d4' }}>🔍</span>,
            }}
          />

          {/* Window Controls */}
          <WindowControls />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AIToolbarHeader;
