import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const EditMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    console.log(action); // Placeholder for action handling
    handleMenuClose();
  };

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        sx={{ color: '#d4d4d4', textTransform: 'none', padding: '2px 8px' }}
      >
        Edit
      </Button>
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
        <MenuItem onClick={() => handleAction('undo')}>Undo</MenuItem>
        <MenuItem onClick={() => handleAction('redo')}>Redo</MenuItem>
      </Menu>
    </>
  );
};

export default EditMenu;
