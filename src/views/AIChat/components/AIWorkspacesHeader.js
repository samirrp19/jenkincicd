import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useThemeContext } from "../../AppStore/components/ThemeContext";
import useAuth from "hooks/useAuth";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

// ✅ AI Models
const STANDARD_MODELS = [
  { name: "GPT-4o Mini", icon: "/icons/gpt.png" },
];

const ADVANCED_MODELS = [
  { name: "GPT-4o Mini", icon: "/icons/gpt.png" },
];

const AIWorkspacesHeader = ({ toggleSidebar, selectedOrg, setSelectedOrg }) => {
  const { themeMode } = useThemeContext();
  const { token, user } = useAuth();
  const { projectId } = useParams();
  const userId = user?.id || "";

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [usageAnchorEl, setUsageAnchorEl] = useState(null);
  const [modelAnchorEl, setModelAnchorEl] = useState(null);
  const [selectedModel, setSelectedModel] = useState("GPT-4o Mini");
  const [activeTab, setActiveTab] = useState(0);

  const open = Boolean(anchorEl);
  const usageOpen = Boolean(usageAnchorEl);

  useEffect(() => {
    if (!token || !userId) return;

    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/org/${userId}/organizations`, {
          headers: { "x-auth-token": token },
        });

        let fetchedOrgs = response.data.ownedOrganizations || [];

        // ✅ Ensure "Default" organization is always present
        const defaultOrg = { _id: "default", name: "Default" };
        if (!fetchedOrgs.some((org) => org.name.toLowerCase() === "default")) {
          fetchedOrgs = [defaultOrg, ...fetchedOrgs];
        }

        setOrganizations(fetchedOrgs);

        // ✅ Ensure Default Organization is Selected If No Other Organization Exists
        const savedOrg = localStorage.getItem("selectedOrg");
        if (savedOrg) {
          setSelectedOrg(savedOrg);
        } else {
          setSelectedOrg(defaultOrg._id);
        }
      } catch (err) {
        console.error("Error fetching organizations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [token, userId]);

  // ✅ Handle organization selection
  const handleOrgChange = (event) => {
    setSelectedOrg(event.target.value);
    localStorage.setItem("selectedOrg", event.target.value);
  };

  // ✅ Handle AI model selection
  const handleModelClick = (event) => {
    setModelAnchorEl(event.currentTarget);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setModelAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClose = () => {
    setModelAnchorEl(null);
  };

  // ✅ Handle Avatar and Usage clicks
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUsageClick = (event) => {
    setUsageAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: themeMode === "light" ? "#fff" : "#1e1e1e",
        color: themeMode === "light" ? "#000" : "#fff",
        height: "56px",
        zIndex: 1100,
        px: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // ✅ Ensures vertical alignment
          height: "100%",
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={toggleSidebar} sx={{ color: "inherit" }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Learntute
          </Typography>
        </Box>

        {/* Center Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Organization Selector */}
          <FormControl sx={{ minWidth: 200 }}>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Select
                value={selectedOrg || "default"}
                onChange={handleOrgChange}
                displayEmpty
                IconComponent={ExpandMoreIcon}
                sx={{
                  height: "36px", // ✅ Match header height
                  backgroundColor: "#f4f4f4",
                  borderRadius: "8px",
                  "& .MuiSvgIcon-root": { color: "#000" },
                }}
              >
                {organizations.map((org) => (
                  <MenuItem key={org._id} value={org._id}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>

          {/* AI Model Selector */}
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ cursor: "pointer", color: "#5A5CD6", fontSize: "14px" }}
            onClick={handleModelClick}
          >
            AI Model: {selectedModel}
          </Typography>

          {/* AI Model Dropdown */}
          <Menu
            anchorEl={modelAnchorEl}
            open={Boolean(modelAnchorEl)}
            onClose={handleClose}
          >
            <Box sx={{ width: 320, p: 2 }}>
              <Typography fontWeight="bold" sx={{ mb: 1 }}>
                Model
              </Typography>
              
              {/* Tabs for switching between Standard and Advanced models */}
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Standard" />
                <Tab label="Advanced" />
              </Tabs>
              
              {/* Render Models */}
              {(activeTab === 0 ? STANDARD_MODELS : ADVANCED_MODELS).map((model) => (
                <MenuItem 
                  key={model.name} 
                  onClick={() => handleModelSelect(model.name)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2, // ✅ Adds spacing between icon and text
                    py: 1.2, // ✅ Padding for consistent vertical alignment
                  }}
                >
                  {/* ✅ Display Icon */}
                  <img 
                    src={model.icon} 
                    alt={model.name} 
                    style={{ width: 24, height: 24 }} // ✅ Adjust the size of the icon
                  />
                  {model.name}
                </MenuItem>
              ))}
            </Box>
          </Menu>

        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleUsageClick}>
            <InfoOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleAvatarClick}>
            <Avatar>P</Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AIWorkspacesHeader;
