import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const ViewMenu = ({ toggleAppViewer }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle opening the View menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the View menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* View button to open the dropdown */}
      <Button
        onClick={handleMenuOpen}
        sx={{ color: '#d4d4d4', textTransform: 'none', padding: '2px 8px' }}
      >
        View
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
          },
        }}
      >
        {/* App Viewer menu item */}
        <MenuItem
          onClick={() => {
            toggleAppViewer(true); // Open App Viewer
            handleMenuClose(); // Close the menu after clicking
          }}
        >
          App Viewer
        </MenuItem>
      </Menu>
    </>
  );
};

export default ViewMenu;
