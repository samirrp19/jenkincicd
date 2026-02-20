import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Typography,
  Paper,
  Menu,
  MenuItem,
  Divider,
  Button,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  InputBase
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import axios from "axios";

const api_url = process.env.REACT_APP_API_URL;

const Header = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [navValue, setNavValue] = useState(0);
  const [profilePic, setProfilePic] = useState("");
  const open = Boolean(anchorEl);
  const { token, user, handleSetToken } = useAuth();
  const navigate = useNavigate();

  const projects = [
    { id: 1, name: "learntute" },
    { id: 2, name: "admin portal" },
    { id: 3, name: "chatapp" },
  ];

  useEffect(() => {
    if (user?.username && token) {
      axios
        .get(`${api_url}/api/users/${user.username}/profile`, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          const pic = res.data.user?.profilePicture;
          if (pic) setProfilePic(pic);
        })
        .catch((err) => console.error("Error fetching profile picture:", err));
    }
  }, [token, user?.username]);

  const handleAvatarClick = (e) => {
    if (user) setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await axios.post(`${api_url}/api/auth/logout`, {}, { headers: { "x-auth-token": token } });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    handleSetToken(null, null);
    navigate("/login", { replace: true });
  };

  const handleLogoClick = () => {
    if (user?.username) {
      navigate(`/${user.username}/community`);
    }
  };

  const handleMyProfile = () => {
    if (user?.username) {
      navigate(`/${user.username}/profile`);
      handleClose();
    }
  };

  const capitalize = (text) =>
    text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const handleNavClick = (path) => {
    if (user?.username) {
      if (path === "home") {
        navigate(`/${user.username}/community`); // ✅ Correct Home -> Community
      } else {
        navigate(`/${user.username}/${path}`);
      }
    }
  };


  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          height: "60px",
          borderBottom: "1px solid #e0e0e0",
          justifyContent: "center",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            px: 2,
          }}
        >
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={handleLogoClick} size="small">
              <img src="/lt-logo.svg" alt="Logo" style={{ height: '120px', width: 'auto', objectFit: 'contain' }} />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f4f4f4",
                borderRadius: "20px",
                px: 1.5,
                height: 30,
                width: { xs: 180, sm: 220 },
              }}
            >
              <SearchIcon sx={{ fontSize: 18, color: "#666" }} />
              <InputBase placeholder="Search..." sx={{ ml: 1, fontSize: 14, flex: 1 }} />
            </Box>
          </Box>
         {/* Center Icons */}
         <Box sx={{ display: "flex", gap: 30, alignItems: "center" }}>
           <IconButton onClick={() => handleNavClick("home")}>
             <Box
               component="img"
               src="/assets/home.png"
               alt="Home"
               sx={{ width: 30, height: 30 }}
             />
           </IconButton>
           <IconButton onClick={() => handleNavClick("groups")}>
             <Box
               component="img"
               src="/assets/group.png"
               alt="Groups"
               sx={{ width: 30, height: 30 }}
             />
           </IconButton>
           <IconButton onClick={() => handleNavClick("messenger")}>
             <Box
               component="img"
               src="/assets/chat.png"
               alt="Messenger"
               sx={{ width: 30, height: 30 }}
             />
           </IconButton>
         </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton><img src="/grid.png" alt="Menu" style={{ width: 20 }} /></IconButton>
            <IconButton><NotificationsIcon sx={{ fontSize: 20, color: "#666" }} /></IconButton>
            <IconButton onClick={handleAvatarClick}>
              <Avatar
                src={profilePic || undefined}
                sx={{ width: 30, height: 30 }}
              >
                {(!profilePic && user?.name) ? user.name[0] : null}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Bottom Navigation */}
      <Paper
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid #e0e0e0",
          zIndex: 1300,
        }}
        elevation={3}
      >
        <BottomNavigation value={navValue} onChange={(e, newVal) => setNavValue(newVal)}>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Messages" icon={<ChatBubbleOutlineIcon />} />
          <BottomNavigationAction label="Alerts" icon={<NotificationsIcon />} />
          <BottomNavigationAction
            label="Me"
            icon={<Avatar src={profilePic || undefined} sx={{ width: 24, height: 24 }} />}
            onClick={handleAvatarClick}
          />
        </BottomNavigation>
      </Paper>

      {/* Avatar Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { width: 280, p: 1.5, borderRadius: 3 } }}
      >
        {/* Avatar + Name */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar src={profilePic || undefined} sx={{ width: 56, height: 56, mx: "auto", mb: 1 }}>
            {(!profilePic && user?.name) ? user.name[0] : null}
          </Avatar>
          <Typography fontWeight="600">{user?.name}</Typography>
        </Box>

        {/* Profile Option */}
        <MenuItem onClick={handleMyProfile}>
          <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        {/* Active Projects */}
        {projects.slice(0, 3).map((proj) => (
          <MenuItem key={proj.id}>
            <ListItemIcon><FolderIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary={capitalize(proj.name)} />
          </MenuItem>
        ))}

        {/* See More Projects Button */}
        <Box sx={{ px: 1, mt: 1 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<GroupIcon />}
            sx={{
              backgroundColor: "#e4e6eb",
              color: "#000",
              textTransform: "none",
              fontWeight: "600",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#d8dadf",
              },
            }}
          >
            See more projects
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Settings Section */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Settings & privacy" />
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon><HelpOutlineIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Help & support" />
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Log Out" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
