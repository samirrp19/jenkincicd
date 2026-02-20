import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const FileMenu = () => {
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
        File
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
        <MenuItem onClick={() => handleAction('newFile')}>New File</MenuItem>
        <MenuItem onClick={() => handleAction('save')}>Save</MenuItem>
        <MenuItem onClick={() => handleAction('saveAs')}>Save As</MenuItem>
        <MenuItem onClick={() => handleAction('share')}>Share</MenuItem>
      </Menu>
    </>
  );
};

export default FileMenu;
