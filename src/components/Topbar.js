import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeModeToggler from './ThemeModeToggler';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { disconnectSocket } from "../../src/socket";

import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;

const Topbar = ({ navItems, rightSectionItems, logo }) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const { token, user, handleSetToken } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogoClick = (e) => {
    e.stopPropagation(); // Prevent event propagation
    e.preventDefault(); // Prevent default behavior
    if (token && user) {
      navigate(`/${user.username}/community`);
    } else {
      navigate('/');
    }
  };

  const handleAvatarClick = (event) => {
    event.stopPropagation(); // Prevent event propagation
    if (!user) return; // Prevent menu from opening if user is null
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await axios.post(`${api_url}/api/auth/logout`, {}, { headers: { 'x-auth-token': token } });
    } catch (error) {
      console.error('Logout failed:', error);
    }

    disconnectSocket();
  
    // Clear auth state
    handleSetToken(null, null);
  
    // Redirect to login
    navigate('/login', { replace: true });
  };
  
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width={1}
      sx={{
        height: '56px',
        padding: theme.spacing(0, 2),
        backgroundColor: mode === 'light' ? '#fff' : '#2c2c2c',
        boxShadow: `0 2px 10px ${alpha(theme.palette.common.black, 0.05)}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left Section: Logo */}
      <Box
        onClick={handleLogoClick}
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', height: '56px', padding: theme.spacing(0, 1) }}
      >
        {logo ? (
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: '120px', width: 'auto', objectFit: 'contain' }}
          />
        ) : (
          <Typography
            variant="h6"
            sx={{ color: mode === 'light' ? '#333' : '#fff', fontWeight: 700, fontSize: '1.25rem' }}
          >
            Learntute
          </Typography>
        )}
      </Box>

      {/* Middle Section: Navigation Items */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        {navItems.map((item, index) => (
          <IconButton
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              item.onClick(e);
            }}
            aria-label={item.label || `Navigation item ${index + 1}`}
            sx={{
              color: mode === 'light' ? '#333' : '#fff',
              '&:hover': { color: theme.palette.primary.main },
            }}
          >
            {item.icon}
          </IconButton>
        ))}
      </Box>

      {/* Right Section: Search, Notifications, Custom Button, and Profile */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: { xs: '40%', sm: '25%', md: '20%', lg: '3/12' },
        }}
      >
        {rightSectionItems?.search && (
          <Box
            component="form"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              borderRadius: '5px',
              backgroundColor: alpha(theme.palette.common.black, 0.05),
              px: 2,
              py: 0.5,
              mr: 2,
              maxWidth: '200px',
            }}
          >
            <SearchIcon sx={{ color: mode === 'light' ? '#333' : '#fff' }} />
            <input
              type="text"
              placeholder="Search..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                marginLeft: '8px',
                width: '100%',
                color: mode === 'light' ? '#333' : '#fff',
              }}
            />
          </Box>
        )}
        {rightSectionItems?.notifications && (
          <IconButton
            sx={{ ml: 2, color: mode === 'light' ? '#333' : '#fff', '&:hover': { color: theme.palette.primary.main } }}
            aria-label="Notifications"
            onClick={(e) => e.stopPropagation()} // Prevent event propagation
          >
            <NotificationsIcon />
          </IconButton>
        )}
        {rightSectionItems?.buttonText && (
          <Box sx={{ ml: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ADD8E6',
                color: '#fff',
                height: '40px',
                padding: '0 16px',
                fontSize: '0.875rem',
                borderRadius: '4px',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#87CEEB' },
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event propagation
                rightSectionItems.buttonAction(e);
              }}
            >
              {rightSectionItems.buttonText}
            </Button>
          </Box>
        )}
        <Box sx={{ ml: 3, display: 'flex', alignItems: 'center' }}>
          <IconButton
            sx={{ padding: 0 }}
            onClick={handleAvatarClick}
            aria-label="User profile menu"
          >
            <Avatar
              alt={user?.name || 'Profile'}
              src={user?.avatar || 'https://via.placeholder.com/40'}
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ mt: '45px' }}
            PaperProps={{
              elevation: 3,
              sx: {
                minWidth: 200,
                boxShadow: `0 2px 10px ${alpha(theme.palette.common.black, 0.05)}`,
              },
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <ThemeModeToggler />
              </ListItemIcon>
              <ListItemText>Dark Mode</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element,
      onClick: PropTypes.func,
    })
  ),
  rightSectionItems: PropTypes.shape({
    search: PropTypes.bool,
    notifications: PropTypes.bool,
    buttonText: PropTypes.string,
    buttonAction: PropTypes.func,
  }),
  user: PropTypes.object,
  logo: PropTypes.string,
};

export default Topbar;
