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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useThemeContext } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectsHeader = ({ toggleSidebar, selectedOrg, setSelectedOrg }) => {
  const { themeMode } = useThemeContext();
  const { token, user } = useAuth();
  const userId = user?.id || "";
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [usageAnchorEl, setUsageAnchorEl] = useState(null);
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
        const defaultOrg = fetchedOrgs.find(org => org.isDefault);
  
        if (!defaultOrg) {
          console.error("❌ Default organization not found!");
        }
  
        setOrganizations(fetchedOrgs);
  
        // ✅ Retrieve last selected organization from localStorage
        const lastSelectedOrg = localStorage.getItem("selectedOrg");
  
        if (lastSelectedOrg && fetchedOrgs.some(org => org._id === lastSelectedOrg)) {
          setSelectedOrg(lastSelectedOrg);
        } else {
          setSelectedOrg(defaultOrg?._id || fetchedOrgs[0]._id);
        }
      } catch (err) {
        console.error("Error fetching organizations:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrganizations();
  }, [token, userId]);
  

  const handleOrgChange = (event) => {
    const newOrg = event.target.value;
    setSelectedOrg(newOrg);
    localStorage.setItem("selectedOrg", newOrg); // ✅ Persist selected organization
  };  

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
        height: "50px",
        zIndex: 1100,
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
        
        {/* Left Section - Sidebar Toggle & App Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={toggleSidebar} sx={{ color: "inherit" }}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/${user?.username || "user"}/community`)}
          >
            <Typography variant="h6" fontWeight="bold">
              Learntute
            </Typography>
          </Box>
        </Box>

        {/* Center Section - Organization Selector */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ minWidth: 200 }}>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Select
                value={selectedOrg || "default"} // ✅ Always fallback to Default
                onChange={handleOrgChange}
                variant="outlined"
                displayEmpty
                sx={{
                  height: "36px",
                  fontSize: "14px",
                  color: themeMode === "light" ? "#000" : "#fff",
                  backgroundColor: themeMode === "light" ? "#f4f4f4" : "#2c2c2c",
                  borderRadius: "8px",
                  "& .MuiSvgIcon-root": { color: themeMode === "light" ? "#000" : "#fff" },
                }}
                IconComponent={ExpandMoreIcon}
              >
                {organizations.map((org) => (
                  <MenuItem key={org._id} value={org._id}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Box>

        {/* Right Section - Usage Icon & Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Usage Icon */}
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
              <Typography variant="body2">Organization: {selectedOrg}</Typography>
              <MenuItem sx={{ mt: 1, color: "#1976d2", fontWeight: "bold" }}>
                Upgrade Plan
              </MenuItem>
            </Box>
          </Menu>

          {/* Avatar */}
          <IconButton onClick={handleAvatarClick} sx={{ color: "inherit" }}>
            <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
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

export default ProjectsHeader;
