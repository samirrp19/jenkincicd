import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoComponent from 'components/LogoComponent'; // Import the Logo component

const SidebarHeader = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        backgroundColor: '#f0f0f0',
        height: '64px', // Ensure the same height as the page header
      }}
    >
      {/* When sidebar is open, show logo and toggle icon */}
      {isSidebarOpen && (
        <>
          <LogoComponent isSidebarOpen={true} /> {/* Show logo when sidebar is open */}
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </>
      )}

      {/* Only the toggle button when sidebar is closed */}
      {!isSidebarOpen && (
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default SidebarHeader;
