import React from 'react';
import { Button, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowBack, ArrowForward, ExpandMore } from '@mui/icons-material';

const Header = ({ title, difficulty }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleExpandClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2">Difficulty Rating: {difficulty}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={handleExpandClick} endIcon={<ExpandMore />}>
          Expand
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>AI Tutor</MenuItem>
        </Menu>
        <IconButton>
          <ArrowBack />
        </IconButton>
        <IconButton>
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
