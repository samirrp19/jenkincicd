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
import RightSidebarForm from "./components/RightSidebarForm"; // ✅ NEW

const apiUrl = process.env.REACT_APP_API_URL;

const AIChat = () => {
  const { themeMode } = useThemeContext();
  const { user, token } = useAuth();
  const userId = user?.id || "";
  const { username, projectId, templateId } = useParams();
  const [contextData, setContextData] = useState({});

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

  const [podcastEnabled, setPodcastEnabled] = useState(false);
  const [documentationEnabled, setDocumentationEnabled] = useState(false);
  const efsPath = "/user/home"
  const packageInfoUrl = "/user/home"

  const fetchSession = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/session/${userId}`, {
        headers: { "x-auth-token": token },
      });
      await res.json();
    } catch (err) {
      console.error("Error fetching session:", err);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [userId]);

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
          podcastEnabled={podcastEnabled}
          setPodcastEnabled={setPodcastEnabled}
          documentationEnabled={documentationEnabled}
          setDocumentationEnabled={setDocumentationEnabled}
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
            <WorkspaceHeader
              onViewApp={() => setAppViewerOpen(true)}
              onTogglePodcast={setPodcastEnabled}
              onToggleDocs={setDocumentationEnabled}
            />
          </Box>

          <Box sx={{ display: "flex", flex: 1, overflow: "hidden", marginTop: "110px" }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <ChatPromptContainer
                postType="template"
                appId={projectId}
                workspaceId="default"
                workspaceName="default"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabContexts={tabContexts}
                setTabContexts={setTabContexts}
                userId={userId}
                efsPath={"/efs/default"}
                tempEfsPath={"/efs/temp/default"}
                selectedLanguage={"react"}
                podcastEnabled={podcastEnabled}
                documentationEnabled={documentationEnabled}
              />
            </Box>

            {/* ✅ Right Sidebar */}
            <RightSidebarForm
              initialProjectName={projectName}
              onSave={({ projectName, appType, framework }) => {
                console.log("Saved Config:", { projectName, appType, framework });
                setProjectName(projectName);
              }} 
              token={token}
              contextData={contextData}
              setContextData={setContextData}
              projectPath={efsPath}
              packageInfoUrl={packageInfoUrl} 
            />
          </Box>
        </Box>
      </Box>

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
          templateId={"default"}
          workspace={"default"}
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

export default AIChat;