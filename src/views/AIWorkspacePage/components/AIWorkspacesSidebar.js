import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  ButtonGroup,
  Button
} from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";
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

import WorkspaceSettingsModal from "./WorkspaceSettingsModal";

const AIWorkspacesSidebar = ({
  isCollapsed,
  setSelectedPage,
  setSelectedSidebarTab,
  selectedSidebarTab,
  projectId,
  templateId,
  activeWorkspace,
  username,
  projectName
}) => {
  const { themeMode, toggleTheme } = useThemeContext();
  const isDarkMode = themeMode === "dark";
  const navigate = useNavigate();

  const [settingsOpen, setSettingsOpen] = useState(false);

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
        {!isCollapsed && (
          <Typography variant="body2" fontWeight="bold" sx={{ pl: 2, pb: 1 }}>
            {projectName}
          </Typography>
        )}

        {/* Workspace Tabs */}
        <List>
          <ListItem button onClick={() => navigate(`/${username}/projects`)}>
            <ListItemIcon sx={{ color: "inherit" }}><FolderIcon /></ListItemIcon>
            {!isCollapsed && <ListItemText primary="Active Projects" />}
          </ListItem>

          <ListItem
            button
            selected={selectedSidebarTab === "prompt"}
            onClick={() => setSelectedSidebarTab("prompt")}
          >
            <ListItemIcon sx={{ color: "inherit" }}><StarIcon /></ListItemIcon>
            {!isCollapsed && <ListItemText primary="Prompts" />}
          </ListItem>

          <ListItem
            button
            selected={selectedSidebarTab === "media"}
            onClick={() => setSelectedSidebarTab("media")}
          >
            <ListItemIcon sx={{ color: "inherit" }}><GroupIcon /></ListItemIcon>
            {!isCollapsed && <ListItemText primary="Media" />}
          </ListItem>

          <ListItem
            button
            selected={selectedSidebarTab === "members"}
            onClick={() => setSelectedSidebarTab("members")}
          >
            <ListItemIcon sx={{ color: "inherit" }}><GroupIcon /></ListItemIcon>
            {!isCollapsed && <ListItemText primary="Members" />}
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Organization */}
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

        {/* Setup */}
        {!isCollapsed && (
          <Typography variant="body2" fontWeight="bold" sx={{ pl: 2, pb: 1 }}>
            Setup
          </Typography>
        )}
        <List>
          <ListItem button onClick={() => setSettingsOpen(true)}>
            <ListItemIcon sx={{ color: "inherit" }}><AccountCircleIcon /></ListItemIcon>
            {!isCollapsed && <ListItemText primary="Settings" />}
          </ListItem>
          <ListItem button onClick={() => setSelectedPage("Logout")}>
            <ListItemIcon sx={{ color: "inherit" }}><ExitToAppIcon /></ListItemIcon>
            {!isCollapsed && <ListItemText primary="Logout" />}
          </ListItem>
        </List>

        {/* Code Editor */}
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
                navigate(route);
              }}
            >
              Code Editor 🚀
            </Button>
          </Box>
        )}

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

      {/* Theme Toggle */}
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
              borderRadius: "10px 0 0 10px",
              flex: 1,
            }}
          >
            🌙 Dark
          </Button>
          <Button
            onClick={() => isDarkMode && toggleTheme()}
            sx={{
              backgroundColor: isDarkMode ? "#333" : "transparent",
              color: isDarkMode ? "#fff" : "#888",
              fontWeight: isDarkMode ? "bold" : "normal",
              borderRadius: "0 10px 10px 0",
              flex: 1,
            }}
          >
            🌞 Light 
          </Button>
        </ButtonGroup>
      </Box>

      {/* Workspace Settings Modal */}
      <WorkspaceSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        workspaceData={activeWorkspace}
        projectId={projectId}
        username={username}
      />
    </Box>
  );
};

export default AIWorkspacesSidebar;
