import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TemplatePageHeader = () => {
  const [usageAnchorEl, setUsageAnchorEl] = useState(null);
  const [aiModelAnchorEl, setAiModelAnchorEl] = useState(null);
  const [selectedModel, setSelectedModel] = useState("GPT-4o Mini");
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

  const usageOpen = Boolean(usageAnchorEl);
  const aiModelOpen = Boolean(aiModelAnchorEl);
  const avatarOpen = Boolean(avatarAnchorEl);

  const handleUsageClick = (event) => {
    setUsageAnchorEl(event.currentTarget);
  };

  const handleAiModelClick = (event) => {
    setAiModelAnchorEl(event.currentTarget);
  };

  const handleAvatarClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        height: "50px",
        zIndex: 1100,
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
        
        {/* Left Section - Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Learntute
          </Typography>
        </Box>

        {/* Right Section - Usage, AI Model Selector, Fullscreen & Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          {/* Usage Button */}
          <IconButton onClick={handleUsageClick} sx={{ color: "inherit", display: "flex", alignItems: "center" }}>
            <InfoOutlinedIcon />
            <Typography variant="body2" fontWeight="bold" sx={{ ml: 1 }}>
              Usage
            </Typography>
          </IconButton>
          <Menu
            anchorEl={usageAnchorEl}
            open={usageOpen}
            onClose={() => setUsageAnchorEl(null)}
            sx={{ mt: 1 }}
          >
            <Box sx={{ p: 2, minWidth: "250px" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Current Usage
              </Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>
                Free Trial Quota
              </Typography>
              <Typography variant="body2">AI Requests: 2/20 used</Typography>
              <Typography variant="body2">Plan: Free</Typography>
            </Box>
          </Menu>

          {/* AI Model Selector */}
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              variant="outlined"
              displayEmpty
              sx={{
                height: "36px",
                fontSize: "14px",
                color: "#000",
                backgroundColor: "#f4f4f4",
                borderRadius: "8px",
                "& .MuiSvgIcon-root": { color: "#000" },
              }}
              IconComponent={ExpandMoreIcon}
              onClick={handleAiModelClick}
            >
              <MenuItem value="GPT-4o Mini">GPT-4o Mini</MenuItem>
              <MenuItem value="GPT-4 Turbo">GPT-4 Turbo</MenuItem>
              <MenuItem value="GPT-3.5">GPT-3.5</MenuItem>
            </Select>
          </FormControl>
          
          {/* Fullscreen Icon */}
          <IconButton sx={{ color: "inherit" }}>
            <FullscreenIcon />
          </IconButton>

          {/* Avatar */}
          <IconButton onClick={handleAvatarClick} sx={{ color: "inherit" }}>
            <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
          </IconButton>
          <Menu
            anchorEl={avatarAnchorEl}
            open={avatarOpen}
            onClose={() => setAvatarAnchorEl(null)}
            sx={{ mt: 1 }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TemplatePageHeader;
