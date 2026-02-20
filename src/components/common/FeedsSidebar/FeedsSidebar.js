import React from "react";
import { Box, Avatar, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuth from 'hooks/useAuth'; 


const FeedsSidebar = ({ name }) => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  // Ensure user is always defined (Fixes ESLint hook error)
  const username = user?.username || '';
  
  const sidebarItems = [
    { icon: <GroupIcon color="primary" />, text: "Friends", path: "/friends" },
    { icon: <HistoryIcon color="primary" />, text: "Community", path: `/${username}/community` },
    { icon: <BookmarkIcon color="secondary" />, text: "Saved", path: "/saved" },
    { icon: <GroupIcon color="primary" />, text: "Groups", path: "/groups" },
    { icon: <VideoLibraryIcon color="primary" />, text: "Video", path: "/video" },
    { icon: <StorefrontIcon color="primary" />, text: "Marketplace", path: "/marketplace" },
  ];
  
  const shortcuts = [
    { icon: "https://via.placeholder.com/40", text: "8 Ball Pool" },
    { icon: "https://via.placeholder.com/40", text: "Angry Birds Friends" },
    { icon: "https://via.placeholder.com/40", text: "Criminal Case" },
    { icon: "https://via.placeholder.com/40", text: "FarmVille 2" },
    { icon: "https://via.placeholder.com/40", text: "Learntute" },
  ];
  

  return (
    <Box sx={{ width: 280, height: "100vh", overflowY: "auto", p: 2, bgcolor: "#f5f5f5" }}>
      {/* Profile Section */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src="https://via.placeholder.com/50" sx={{ mr: 2 }} />
        <Typography fontWeight="bold">{name}</Typography>
      </Box>

      {/* Sidebar Items */}
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem button key={index} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      {/* Show More Button */}
      <Button startIcon={<ExpandMoreIcon />} fullWidth sx={{ textTransform: "none", my: 1 }}>
        See more
      </Button>

      <Divider sx={{ my: 2 }} />

      {/* Shortcuts Section */}
      <Typography fontWeight="bold" sx={{ mb: 1 }}>Your shortcuts</Typography>
      <List>
        {shortcuts.map((shortcut, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <Avatar src={shortcut.icon} sx={{ width: 32, height: 32 }} />
            </ListItemIcon>
            <ListItemText primary={shortcut.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FeedsSidebar;
