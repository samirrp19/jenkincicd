import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const MoreOptions = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        sx={{ color: '#d4d4d4', padding: '2px 8px' }}
      >
        <MoreVert />
      </IconButton>
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
        <MenuItem onClick={() => console.log('Terminal')}>Terminal</MenuItem>
        <MenuItem onClick={() => console.log('Help')}>Help</MenuItem>
      </Menu>
    </>
  );
};

export default MoreOptions;
