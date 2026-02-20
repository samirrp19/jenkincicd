import React, { useState, useEffect } from "react";
import { Box, Stack, Drawer, useTheme } from "@mui/material";
import { useThemeContext } from "./components/ThemeContext";
import ProjectsSidebar from "./components/project/ProjectsSidebar";
import ProjectsHeader from "./components/project/ProjectsHeader";
import ProjectsList from "./components/project/ProjectsList";
import InvitesPage from "./components/InvitesPage";
import FavoritesPage from "./components/FavoritesPage";
import ArchivedProjectsPage from "./components/project/ArchivedProjectsPage";
import OrganizationsPage from "./components/OrganizationsPage";
import SubscriptionsPage from "./components/SubscriptionsPage";
import ProfilePage from "./components/profile/ProfilePage";

const AppStore = () => {
  const { themeMode } = useThemeContext();
  const theme = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("ActiveProjects"); // Default Page

  // ✅ Persist Organization Selection Across Sessions
  const [selectedOrg, setSelectedOrg] = useState(() => {
    return localStorage.getItem("selectedOrg") || "Default";
  });

  // ✅ Update Local Storage on Organization Change
  useEffect(() => {
    if (selectedOrg) {
      localStorage.setItem("selectedOrg", selectedOrg);
    }
  }, [selectedOrg]);

  // Function to determine which page to render based on the selected menu
  const renderPage = () => {
    switch (selectedPage) {
      case "ActiveProjects":
        return <ProjectsList selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} />; // ✅ Pass state setter
      case "Invites":
        return <InvitesPage />;
      case "Favorites":
        return <FavoritesPage />;
      case "ArchivedProjects":
        return <ArchivedProjectsPage />;
      case "Organizations":
        return <OrganizationsPage />;
      case "Subscriptions":
        return <SubscriptionsPage />;
      case "Profile":
        return <ProfilePage />;
      default:
        return <ProjectsList selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} />;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ✅ Header with Organization Dropdown */}
      <ProjectsHeader 
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg} // ✅ Pass state setter function
      />

      {/* ✅ Main Layout */}
      <Stack
        direction="row"
        sx={{
          flex: 1,
          height: "calc(100vh - 50px)", // Subtracting header height from full viewport height
        }}
      >
        {/* ✅ Sidebar (Fixed, Non-Scrollable) */}
        <Box
          sx={{
            width: isSidebarOpen ? "240px" : "80px",
            transition: "width 0.3s ease",
            position: "fixed",
            left: 0,
            top: "50px",
            height: "calc(100vh - 50px)",
            backgroundColor: theme.palette.background.paper,
            display: { xs: "none", md: "block" },
          }}
        >
          <ProjectsSidebar isCollapsed={!isSidebarOpen} setSelectedPage={setSelectedPage} />
        </Box>

        {/* ✅ Main Content (Shifts based on sidebar width) */}
        <Box
          sx={{
            flex: 1,
            marginLeft: isSidebarOpen ? "240px" : "80px",
            transition: "margin-left 0.3s ease",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "hidden", // Remove scroll
            height: "calc(100vh - 50px)",
          }}
        >
          {renderPage()} {/* ✅ Load respective page with selectedOrg passed */}
        </Box>
      </Stack>

      {/* ✅ Mobile Sidebar */}
      <Drawer
        anchor="left"
        open={isMobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <ProjectsSidebar isCollapsed={false} setSelectedPage={setSelectedPage} />
      </Drawer>
    </Box>
  );
};

export default AppStore;
