import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import TemplateSelection from "./components/TemplateSelection";
import TemplatePageHeader from "./components/TemplatePageHeader";
import Sidebar from "./components/Sidebar";
import InfoSection from "./components/InfoSection";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectAIPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { username, projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchWorkspaces = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/projects/${username}/projects/ai/${projectId}/ws/`, {
          method: "GET",
          headers: { "x-auth-token": token },
        });

        if (!response.ok) {
          console.error("❌ Failed to fetch workspaces");
          return;
        }

        const data = await response.json();
        if (data.workspaces.length > 0) {
          // ✅ Get the last active workspace or first workspace
          const lastActiveWorkspace = data.workspaces[0]; // Change logic if tracking last used workspace
          navigate(`/${username}/projects/ai/${projectId}/ws/${lastActiveWorkspace.templateId}`);
        }
      } catch (error) {
        console.error("❌ Error fetching workspaces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, [token, projectId, navigate, username]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1100, backgroundColor: "white", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <TemplatePageHeader />
      </Box>

      {/* Layout */}
      <Box sx={{ display: "flex", flex: 1, pt: "50px" }}>
        {/* Sidebar */}
        <Box sx={{ width: "260px", position: "fixed", top: "50px", left: 0, backgroundColor: "white", boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)", zIndex: 1000 }}>
          <Sidebar />
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, marginLeft: "260px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ position: "sticky", top: "50px", zIndex: 9, backgroundColor: "white", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)" }}>
            <InfoSection />
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
            <TemplateSelection />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectAIPage;
