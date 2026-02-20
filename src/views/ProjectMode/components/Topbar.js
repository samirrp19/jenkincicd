import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { FaHome, FaFolder, FaCompass, FaFileCode, FaCog, FaEnvelope, FaQuestionCircle, FaBars } from 'react-icons/fa';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  height: '48px', // Adjusted to match avatar height
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  minHeight: '48px !important', // Override default Toolbar minHeight
  padding: '0 16px',
});

const NavLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const StyledButton = styled(Button)({
  color: '#fff',
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const StyledIconButton = styled(IconButton)({
  color: '#fff',
  padding: '8px',
});

const StyledMenu = styled(Menu)({
  '& .MuiPaper-root': {
    backgroundColor: '#2c2c2c',
    color: '#fff',
  },
});

const StyledMenuItem = styled(MenuItem)({
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    width: '250px',
  },
});

const Logo = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: '#fff',
});

const HeaderComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <FaHome /> },
    { text: 'My Projects', icon: <FaFolder /> },
    { text: 'Explore', icon: <FaCompass /> },
    { text: 'Templates', icon: <FaFileCode /> },
  ];

  const dropdownItems = [
    { text: 'Logout', icon: <FaHome /> },
    { text: 'Settings', icon: <FaCog /> },
    { text: 'Contact', icon: <FaEnvelope /> },
    { text: 'Help', icon: <FaQuestionCircle /> },
  ];

  const drawer = (
    <div>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <StyledIconButton>{item.icon}</StyledIconButton>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        {isMobile && (
          <StyledIconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <FaBars />
          </StyledIconButton>
        )}
        <Logo>Codex</Logo>
        <NavLinks>
          {menuItems.map((item) => (
            <StyledButton
              key={item.text}
              startIcon={item.icon}
              aria-label={item.text}
            >
              {item.text}
            </StyledButton>
          ))}
        </NavLinks>
        <div>
          <StyledIconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <Avatar 
              alt="User Avatar" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              sx={{ width: 32, height: 32 }} // Smaller avatar
            />
          </StyledIconButton>
          <StyledMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {dropdownItems.map((item) => (
              <StyledMenuItem key={item.text} onClick={handleClose}>
                <StyledIconButton size="small">{item.icon}</StyledIconButton>
                {item.text}
              </StyledMenuItem>
            ))}
          </StyledMenu>
        </div>
      </StyledToolbar>
      <StyledDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </StyledDrawer>
    </StyledAppBar>
  );
};

export default HeaderComponent;
