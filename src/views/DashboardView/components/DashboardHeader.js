import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Button, Menu, MenuItem, TextField } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DashboardHeader = ({ username }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = React.useState(null);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarMenuOpen = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ zIndex: 1400 }}>
      <Toolbar>
        {/* Left side: Username with dropdown */}
        <Box display="flex" alignItems="center">
          <Typography variant="h6">{username}</Typography>
          <IconButton onClick={handleUserMenuOpen}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleUserMenuClose}>
            <MenuItem onClick={handleUserMenuClose}>
              <AddIcon fontSize="small" /> Create Workspace
            </MenuItem>
          </Menu>
        </Box>

        {/* Right side: Avatar, Notifications, and Action Buttons */}
        <Box display="flex" alignItems="center" ml="auto">
          {/* Notifications */}
          <IconButton>
            <NotificationsIcon />
          </IconButton>

          {/* + Create Button */}
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            sx={{ 
              ml: 2, 
              textTransform: 'none', 
              backgroundColor: '#28a745',  // Bright green
              '&:hover': { backgroundColor: '#218838' },  // Darker green on hover
            }}
          >
            Create
          </Button>


          {/* GitHub + Import Button */}
          <Button
            startIcon={<GitHubIcon />}
            variant="contained"
            size="small"
            sx={{ 
              ml: 2, 
              textTransform: 'none', 
              backgroundColor: '#42454a',  // Muted blue
              '&:hover': { 
                backgroundColor: '#0069d9',  // Darker blue on hover
                boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',  // Slightly darker shadow on hover
              },
            }}
          >
            Import
          </Button>

          {/* Search Box */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search in workspace"
            sx={{ 
              ml: 2, 
              minWidth: '200px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ced4da',  // Subtle gray border
                },
                '&:hover fieldset': {
                  borderColor: '#adb5bd',  // Slightly darker gray on hover
                },
              },
            }}
          />

          {/* Avatar with Dropdown */}
          <IconButton onClick={handleAvatarMenuOpen} sx={{ ml: 2 }}>
            <Avatar />
          </IconButton>
          <Menu anchorEl={avatarAnchorEl} open={Boolean(avatarAnchorEl)} onClose={handleAvatarMenuClose}>
            <MenuItem onClick={handleAvatarMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleAvatarMenuClose}>Storage</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
