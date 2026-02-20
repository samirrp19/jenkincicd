import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, ButtonGroup, Button } from "@mui/material";
import TerminalIcon from '@mui/icons-material/Terminal';
import FolderIcon from "@mui/icons-material/Folder";
import StarIcon from "@mui/icons-material/Star";
import ArchiveIcon from "@mui/icons-material/Archive";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useThemeContext } from "../../AppStore/components/ThemeContext";

const AIWorkspacesSidebar = ({ projectId, templateId, isCollapsed, setSelectedPage }) => {
  const { themeMode, toggleTheme } = useThemeContext();
  const isDarkMode = themeMode === "dark";
  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <Box
      sx={{
        width: isCollapsed ? "80px" : "250px",
        transition: "width 0.3s ease",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: isDarkMode ? "#121212" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        padding: "10px",
        borderRight: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
      }}
    >
      {/* Sidebar Content */}
      <Box sx={{ flex: 1 }}>
        {/* Projects Section */}
        {!isCollapsed && (
          <Typography variant="body2" fontWeight="bold" sx={{ pl: 2, pb: 1 }}>
            Projects
          </Typography>
        )}
        <List>
          {[
            { text: "Active Projects", icon: <FolderIcon />, page: "ActiveProjects" },
            { text: "Favorites", icon: <StarIcon />, page: "Favorites" },
            { text: "Archived Projects", icon: <ArchiveIcon />, page: "ArchivedProjects" },
            { text: "Invites", icon: <GroupIcon />, page: "Invites" },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                if (item.page === "ActiveProjects") {
                  navigate(`/${username}/projects`);
                } else {
                  setSelectedPage(item.page);
                }
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Organization Section */}
        {!isCollapsed && (
          <Typography variant="body2" fontWeight="bold" sx={{ pl: 2, pb: 1 }}>
            Organization
          </Typography>
        )}
        <List>
          {[
            { text: "Your Organizations", icon: <BusinessIcon />, page: "Organizations" },
            { text: "Subscriptions", icon: <SubscriptionsIcon />, page: "Subscriptions" },
          ].map((item, index) => (
            <ListItem button key={index} onClick={() => setSelectedPage(item.page)}>
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Account Section */}
        {!isCollapsed && (
          <Typography variant="body2" fontWeight="bold" sx={{ pl: 2, pb: 1 }}>
            Account
          </Typography>
        )}
        <List>
          {[
            { text: "View Profile", icon: <AccountCircleIcon />, page: "Profile" },
            { text: "Logout", icon: <ExitToAppIcon />, page: "Logout" },
          ].map((item, index) => (
            <ListItem button key={index} onClick={() => setSelectedPage(item.page)}>
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>

        {/* Code Editor Button */}
        {!isCollapsed && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
               variant="contained"
               color="primary"
               startIcon={<TerminalIcon />}
               sx={{
                 width: "100%",
                 fontWeight: "bold",
                 textTransform: "none",
                 borderRadius: "8px",
               }}
               onClick={() => {
                 const route = `/${username}/projects/ai/${projectId}/ws/${templateId}/Editor`;
                 console.log("🚀 Navigating to:", route);
                 navigate(route);
               }}
             >
               Code Editor 🚀
            </Button>
          </Box>
        )}
        {/* Upgrade Plan Button */}
        {!isCollapsed && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<RocketLaunchIcon />}
              sx={{
                width: "100%",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Upgrade Plan 🚀
            </Button>
          </Box>
        )}

      </Box>

      {/* Theme Toggle - Fixed to Bottom */}
      <Box sx={{ position: "absolute", bottom: "20px", left: 0, right: 0, textAlign: "center", px: 2 }}>
        <ButtonGroup
          fullWidth
          sx={{
            border: `1px solid ${isDarkMode ? "#444" : "#ddd"}`,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Button
            onClick={() => !isDarkMode && toggleTheme()}
            sx={{
              backgroundColor: !isDarkMode ? "#f4f4f4" : "transparent",
              color: !isDarkMode ? "#000" : "#888",
              fontWeight: !isDarkMode ? "bold" : "normal",
              "&:hover": { backgroundColor: "#e0e0e0" },
              borderRadius: "10px 0 0 10px",
              flex: 1,
            }}
          >
            🌞 Light
          </Button>
          <Button
            onClick={() => isDarkMode && toggleTheme()}
            sx={{
              backgroundColor: isDarkMode ? "#333" : "transparent",
              color: isDarkMode ? "#fff" : "#888",
              fontWeight: isDarkMode ? "bold" : "normal",
              "&:hover": { backgroundColor: "#222" },
              borderRadius: "0 10px 10px 0",
              flex: 1,
            }}
          >
            🌙 Dark
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default AIWorkspacesSidebar;
