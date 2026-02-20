import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Drawer, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import AIWorkspacesHeader from "./components/AIWorkspacesHeader";
import AIWorkspacesSidebar from "./components/AIWorkspacesSidebar";
import WorkspaceHeader from "./components/WorkspaceHeader";
import ChatPromptContainer from "./components/ChatPromptContainer";
import AppViewer from "views/AIPostBuilder/components/AppViewer";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeContext } from "../AppStore/components/ThemeContext";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const AIWorkspacePage = () => {
  const { themeMode } = useThemeContext();
  const { user, token } = useAuth();
  const userId = user?.id || "";
  const { username, projectId, templateId } = useParams();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState("ActiveProjects");
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [workspaceProjectId, setWorkspaceProjectId] = useState(null);
  const [workspaceTemplateId, setWorkspaceTemplateId] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  const [appViewerOpen, setAppViewerOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [screenshotList, setScreenshotList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  const [activeTab, setActiveTab] = useState("default");
  const [tabContexts, setTabContexts] = useState({ default: [] });
  const [projectName, setProjectName] = useState("");
  const [projectOwner, setUserName] = useState("");
  const [organization, setOrganization] = useState(null);

  const fetchSession = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/session/${userId}`, {
        headers: { "x-auth-token": token },
      });
      const data = await res.json();
      if (res.ok && data.sessionData?.socketId) {
        // You can optionally use socketId if needed
      }
    } catch (err) {
      console.error("Error fetching session:", err);
    }
  };

  const fetchWorkspaces = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/projects/${username}/projects/ai/${projectId}/ws/`, {
        headers: { "x-auth-token": token },
      });
      const data = await res.json();
      if (res.ok) {
        setWorkspaces(data.workspaces || []);
        const saved = localStorage.getItem("activeWorkspace");
        const parsed = saved ? JSON.parse(saved) : null;
        const found = data.workspaces.find(ws => ws.templateId === parsed?.templateId);
        setActiveWorkspace(found || data.workspaces[0]);
      }
    } catch (err) {
      console.error("Error fetching workspaces:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkspaceMetadata = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/projects/${username}/projects/ai/${projectId}/${templateId}`, {
        headers: { "x-auth-token": token },
      });
      const data = await res.json();
      if (res.ok && data.workspace) {
        const { projectId: pid, projectName, username: uname, organization, workspace } = data;
        const { templateId: tid, framework, frameworkType, tempEfsPath, efsPath, workspaceName } = workspace;
        setWorkspaceProjectId(pid);
        setWorkspaceTemplateId(tid);
        setActiveWorkspace(workspace);
        setProjectName(projectName);
        setUserName(uname);
        setOrganization(organization);
        localStorage.setItem("activeWorkspace", JSON.stringify({
          templateId: tid, projectId: pid, framework, frameworkType, tempEfsPath, efsPath, workspaceName
        }));
      }
    } catch (err) {
      console.error("Error fetching workspace metadata:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
    fetchWorkspaces();
  }, [projectId, userId]);

  useEffect(() => {
    fetchWorkspaceMetadata();
  }, [projectId, templateId]);

  useEffect(() => {
    if (activeWorkspace) {
      localStorage.setItem("activeWorkspace", JSON.stringify(activeWorkspace));
    }
  }, [activeWorkspace]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", bgcolor: "#f4f6f8" }}>
      <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1100, bgcolor: "white", boxShadow: 1 }}>
        <AIWorkspacesHeader
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />
      </Box>

      <Box sx={{ display: "flex", flex: 1, pt: "60px", overflow: "hidden" }}>
        <Box sx={{
          width: "260px", position: "fixed", top: "60px", left: 0, bgcolor: "white",
          height: "calc(100vh - 60px)", zIndex: 1000, boxShadow: 1
        }}>
          <AIWorkspacesSidebar
            isCollapsed={!isSidebarOpen}
            setSelectedPage={setSelectedPage}
            projectId={workspaceProjectId}
            templateId={workspaceTemplateId}
          />
        </Box>

        <Box sx={{
          flex: 1, marginLeft: "260px", display: "flex", flexDirection: "column",
          height: "calc(100vh - 60px)", overflow: "hidden"
        }}>
          <Box sx={{
            position: "fixed", top: "60px", left: "260px", right: 0, zIndex: 1090,
            bgcolor: "white", padding: "10px 16px", borderBottom: "1px solid #ddd"
          }}>
            {!loading ? (
              <WorkspaceHeader
                workspaces={workspaces}
                activeWorkspace={activeWorkspace}
                setActiveWorkspace={setActiveWorkspace}
                fetchWorkspaces={fetchWorkspaces}
                onViewApp={() => setAppViewerOpen(true)}
              />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", flex: 1, overflow: "hidden", marginTop: "110px" }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <ChatPromptContainer
                appId={projectId}
                workspaceId={activeWorkspace?.templateId}
                workspaceName={activeWorkspace?.workspace}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabContexts={tabContexts}
                setTabContexts={setTabContexts}
                userId={userId}
                efsPath={activeWorkspace?.efsPath}
                tempEfsPath={activeWorkspace?.tempEfsPath}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* App Viewer Drawer */}
      <Drawer
        anchor="right"
        open={appViewerOpen}
        onClose={() => setAppViewerOpen(false)}
        PaperProps={{
          sx: {
            width: isMaximized ? "100%" : "50%",
            zIndex: 1300,
            bgcolor: "#1e1e1e",
          },
        }}
      >
        <AppViewer
          open={true}
          toggleAppViewer={() => setAppViewerOpen(false)}
          token={token}
          userId={userId}
          username={username}
          projectId={projectId}
          templateId={activeWorkspace?.templateId}
          workspace={activeWorkspace?.workspace}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          screenshotList={screenshotList}
          setScreenshotList={setScreenshotList}
          setPreviewImage={setPreviewImage}
          compiledAppUrl={`https://${username}-${projectName?.toLowerCase()}.learntute.com`}
        />
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <IconButton onClick={() => setIsMaximized(!isMaximized)} sx={{ color: "#fff" }}>
            <FullscreenIcon />
          </IconButton>
          <IconButton onClick={() => setAppViewerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AIWorkspacePage;
