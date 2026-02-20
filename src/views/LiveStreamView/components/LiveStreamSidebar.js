import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import DownloadIcon from '@mui/icons-material/Download';

const LiveStreamSidebar = ({ onMenuItemClick, onToggleSidebar, isSidebarOpen }) => {

  const menuItems = [
    { label: 'Home', icon: <HomeIcon />, key: 'home' },
    { label: 'Recordings', icon: <VideocamIcon />, key: 'recordings' },
    { label: 'Videos', icon: <VideoLibraryIcon />, key: 'videos' },
    { label: 'Subscriptions', icon: <SubscriptionsIcon />, key: 'subscriptions' },
    { label: 'Downloads', icon: <DownloadIcon />, key: 'downloads' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? 240 : 80,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSidebarOpen ? 240 : 80,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
          },
        }}
      >
        {/* Sidebar Toggler */}
        <IconButton onClick={onToggleSidebar} sx={{ margin: '16px' }}>
          <MenuIcon />
        </IconButton>
        <Divider />

        {/* Sidebar Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.key} onClick={() => onMenuItemClick(item.key)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {isSidebarOpen && <ListItemText primary={item.label} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default LiveStreamSidebar;
