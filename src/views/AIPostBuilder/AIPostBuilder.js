import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import AIToolbarHeader from "./components/AIToolbarHeader";
import AIFooter from "./components/AIFooter";
import AppViewer from "./components/AppViewer";
import ProjectSidebar from "./components/ProjectSidebar";
import ProjectExplorer from "./components/Panels/ProjectExplorer";
import SearchPanel from "./components/Panels/SearchPanel";
import GitPanel from "./components/Panels/GitPanel";
// import PromptsPanel from "./components/Panels/PromptsPanel";
import ExtensionsPanel from "./components/Panels/ExtensionsPanel";
import EditorTabs from "./components/EditorTabs";
import CodeEditor from "./components/CodeEditor";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import useAuth from "hooks/useAuth";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const AIPostBuilder = () => {
  const { search } = useLocation();
  const { user, token } = useAuth();
  const userId = user?.id;

  const [isAppViewerOpen, setIsAppViewerOpen] = useState(false);
  const [activePanel, setActivePanel] = useState("explorer");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer open state
  const [isDrawerExtended, setIsDrawerExtended] = useState(false); // Split layout state
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [framework, setFramework] = useState("");
  const [frameworkType, setFrameworkType] = useState("");
  const [workspace, setWorkspaceMeta] = useState(null); // For full workspace object
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [workspaceProjectId, setWorkspaceProjectId] = useState(null);
  const [workspaceTemplateId, setWorkspaceTemplateId] = useState(null);
  const [appViewerOpen, setAppViewerOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);


  const [loading, setLoading] = useState(true);

  // ✅ Track active chat tab & its associated context
  const [activeTab, setActiveTab] = useState("default");
  const [tabContexts, setTabContexts] = useState({ default: [] });
  const [socketId, setSocketId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectOwner, setUserName] = useState("");
  const [projectIdState, setProjectId] = useState("");
  const [organization, setOrganization] = useState(null);


  const queryParams = new URLSearchParams(search);
  const appName = queryParams.get("appName");
  const { username, projectId, templateId } = useParams();
  const [workspaceName, setWorkspaceName] = useState(""); // ✅ Add this
  const dynamicAppUrl = `https://${username}-${projectName}.learntute.com/`;
  const [screenshotList, setScreenshotList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // ESC key and arrow key navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") setCurrentIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
  
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, screenshotList]);  
  
  const nextImage = () => {
    if (!screenshotList.length) return;
    const nextIndex = (currentIndex + 1) % screenshotList.length;
    setCurrentIndex(nextIndex);
    setPreviewImage(screenshotList[nextIndex]); // 👈 Full object
  };
  
  const prevImage = () => {
    if (!screenshotList.length) return;
    const prevIndex = (currentIndex - 1 + screenshotList.length) % screenshotList.length;
    setCurrentIndex(prevIndex);
    setPreviewImage(screenshotList[prevIndex]); // 👈 Full object
  };
        
  const downloadImage = () => {
    const a = document.createElement("a");
    const img = screenshotList[currentIndex];
    a.href = img?.s3Url || img?.preview;
    a.download = `screenshot-${currentIndex}.png`;
    a.click();
  };  



  // Function to toggle panel visibility
  const togglePanel = (panelName) => {
    setActivePanel((prev) => (prev === panelName ? null : panelName));
    if (panelName === "prompts") setIsDrawerOpen(true); // Open drawer when "prompts" panel is activated
  };

  // ✅ Fetch existing socket ID from Redis
  const fetchSession = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/session/${userId}`, {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });

      const data = await res.json();

      if (res.ok && data.sessionData?.socketId) {
        console.log("✅ Existing socket ID:", data.sessionData.socketId);
        setSocketId(data.sessionData.socketId);
      } else {
        console.warn("⚠️ No active session found");
      }
    } catch (err) {
      console.error("❌ Error fetching session:", err);
    }
  };

  const fetchWorkspaceMetadata = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(
        `${apiUrl}/api/projects/${username}/projects/ai/${projectId}/${templateId}`,
        {
          method: "GET",
          headers: { "x-auth-token": token },
        }
      );
  
      const data = await response.json();
  
      if (response.ok && data.workspace) {
        const {
          projectId: fetchedProjectId,
          projectName,
          username: fetchedUsername,
          organization,
          workspace
        } = data;
  
        const {
          templateId: fetchedTemplateId,
          framework,
          frameworkType,
          efsPath,
          workspace: workspaceName // ✅ get the workspace name
        } = workspace;
  
        // ✅ Set values in state
        setWorkspaceProjectId(fetchedProjectId);
        setWorkspaceTemplateId(fetchedTemplateId);
        setActiveWorkspace(workspace);
        setProjectName(projectName);
        setUserName(fetchedUsername);
        setOrganization(organization);
        setFramework(framework);
        setFrameworkType(frameworkType);
        setWorkspaceMeta(workspace);
        setWorkspaceName(workspaceName); // ✅ set this to use later when posting
        fetchScreenshotsFromBackend();
  
        // ✅ Store in localStorage
        localStorage.setItem("activeWorkspace", JSON.stringify({
          templateId: fetchedTemplateId,
          projectId: fetchedProjectId,
          framework,
          frameworkType,
          efsPath,
          workspace: workspaceName // ✅ include workspace
        }));
  
        console.log("✅ Workspace metadata loaded");
      } else {
        console.warn("⚠️ Failed to fetch workspace metadata:", data.error);
      }
    } catch (error) {
      console.error("❌ Error fetching workspace metadata:", error);
    } finally {
      setLoading(false);
    }
  };
    
// ✅ On component mount
useEffect(() => {
  fetchSession();
  fetchWorkspaceMetadata();
}, [projectId, templateId, userId]);
  

  // Fetch file content from backend
  const fetchFileContent = async (filePath) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/projects/${username}/projects/ai/${projectId}/ws/file`,
        {
          headers: { "x-auth-token": token },
          params: { userId, path: filePath },
        }
      );
      return response.data.content;
    } catch (err) {
      console.error("Error fetching file content:", err);
      return "Failed to load file content.";
    }
  };

  // Handle file click from ProjectExplorer
  const handleFileClick = async (filePath, fileName) => {
    const existingFile = openFiles.find((file) => file.fileName === fileName);

    if (!existingFile) {
      try {
        const content = await fetchFileContent(filePath);
        const newFile = { fileName, filePath, content };
        setOpenFiles((prev) => [...prev, newFile]);
        setActiveFile(fileName);
        setFileContent(content);
      } catch (err) {
        console.error("Error opening file:", err);
      }
    } else {
      setActiveFile(existingFile.fileName);
      setFileContent(existingFile.content);
    }
  };

  // Handle file close in EditorTabs
  const closeFile = (fileName) => {
    setOpenFiles((prev) => prev.filter((file) => file.fileName !== fileName));
    if (activeFile === fileName) {
      const remainingFiles = openFiles.filter((file) => file.fileName !== fileName);
      if (remainingFiles.length > 0) {
        setActiveFile(remainingFiles[0].fileName);
        setFileContent(remainingFiles[0].content);
      } else {
        setActiveFile(null);
        setFileContent("");
      }
    }
  };

  const fetchScreenshotsFromBackend = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/recordings/${userId}`,
        {
          params: {
            projectId,
            templateId,
            type: "screenshot"
          },
          headers: {
            "x-auth-token": token,
          }
        }
      );
  
      if (data?.recordings?.length > 0) {
        const screenshots = data.recordings.map(r => ({
          s3Url: r.s3Url,
          preview: r.s3Url, // fallback for consistency
        }));
        setScreenshotList(screenshots);
        setPreviewImage(screenshots[0]);
        setCurrentIndex(0);
      }      
    } catch (err) {
      console.error("❌ Failed to fetch screenshots:", err);
    }
  };
  

  return (
    <div style={styles.container}>
      {/* Toolbar Header */}
      <AIToolbarHeader toggleAppViewer={() => setIsAppViewerOpen((prev) => !prev)} />

      {/* App Viewer */}
      <div style={styles.mainArea}>
        {isAppViewerOpen && (
          <AppViewer
          open={isAppViewerOpen}
          toggleAppViewer={() => setIsAppViewerOpen((prev) => !prev)}
          compiledAppUrl={dynamicAppUrl}
          token={token}
          userId={userId}
          username={username}
          projectId={projectId}
          templateId={templateId}
          workspace={workspaceName}
          currentIndex={currentIndex} // ✅ Add this
          setCurrentIndex={setCurrentIndex}
          setScreenshotList={setScreenshotList}
          setPreviewImage={setPreviewImage}
        />        
        )}
      </div>
      {previewImage && (
         <div style={modalStyles.overlay} onClick={() => {
           setPreviewImage(null);
           setCurrentIndex(null);
         }}>
           <div onClick={(e) => e.stopPropagation()} style={modalStyles.content}>
             <button style={modalStyles.closeBtn} onClick={() => {
               setPreviewImage(null);
               setCurrentIndex(null);
             }}>✕</button>
       
             <button style={modalStyles.navBtn} onClick={prevImage}>⟨</button>
       
             <img
               src={typeof previewImage === 'string' ? previewImage : (previewImage?.s3Url || previewImage?.preview)}
               alt="Screenshot Preview"
               style={modalStyles.image}
             />

             <button style={modalStyles.navBtn} onClick={nextImage}>⟩</button>
             <button style={modalStyles.downloadBtn} onClick={() => {
               const link = document.createElement("a");
               link.href = previewImage.s3Url || previewImage.preview;
               link.download = `screenshot-${currentIndex}.png`;
               link.click();
             }}>
               ⬇ Download
             </button>
           </div>
         </div>
       )}

      {/* Main Layout */}
      <div style={styles.body}>
        {/* Sidebar Navigation */}
        <ProjectSidebar activePanel={activePanel} togglePanel={togglePanel} />

        {/* Explorer & Panel Switching Area */}
        <div style={styles.explorerContainer}>
          {activePanel === "explorer" && (
            <ProjectExplorer
              username={username}
              userId={userId}
              token={token}
              projectId={projectId}
              framework={workspace?.framework}
              workspace={workspace?.workspace}
              frameworkType={workspace?.frameworkType}
              appName={appName}
              onFileClick={handleFileClick}
            />
          )}
          {activePanel === "search" && <SearchPanel />}
          {activePanel === "git" && <GitPanel />}
          {activePanel === "extensions" && <ExtensionsPanel />}
        </div>

        {/* Editor Area */}
        <div
          style={{
            ...styles.editorArea,
            width: isDrawerExtended ? "60%" : "100%", // Adjust width dynamically
          }}
        >
          <EditorTabs
            openFiles={openFiles}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            closeFile={closeFile}
            setOpenFiles={setOpenFiles}
          />
          <CodeEditor
            activeFile={activeFile}
            fileContent={fileContent}
            onFileChange={(updatedContent) => {
              setFileContent(updatedContent);
              setOpenFiles((prev) =>
                prev.map((file) =>
                  file.fileName === activeFile ? { ...file, content: updatedContent } : file
                )
              );
            }}
          />
        </div>
      </div>

      {/* Prompts Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        variant="persistent"
        sx={{
          "& .MuiDrawer-paper": {
            width: isDrawerExtended ? "50vw" : "30vw", // Adjust width
            backgroundColor: "#252526",
            padding: "20px",
            overflowX: "hidden",
          },
        }}
      >
        <Box sx={styles.drawerHeader}>
          <IconButton
            sx={styles.toggleButton}
            onClick={() => setIsDrawerExtended(!isDrawerExtended)}
          >
            {isDrawerExtended ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <IconButton
            sx={styles.closeButton}
            onClick={() => setIsDrawerOpen(false)}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
        {/* <PromptsPanel
          appId={projectId} 
          workspaceId={activeWorkspace?.templateId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabContexts={tabContexts}
          setTabContexts={setTabContexts}
          userId={userId}
          efsPath={activeWorkspace?.efsPath}
        /> */}
      </Drawer>

      {/* Footer */}
      <AIFooter />
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateRows: "50px 1fr 28px",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundColor: "#1e1e1e",
  },
  body: {
    gridRow: "2 / 3",
    display: "grid",
    gridTemplateColumns: "60px 300px 1fr",
    height: "100%",
    overflow: "hidden",
  },
  explorerContainer: {
    backgroundColor: "#1e1e1e",
    color: "white",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "auto",
  },
  editorArea: {
    backgroundColor: "#1e1e1e",
    color: "white",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexGrow: 1,
  },
  mainArea: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: "20px",
    overflowY: "auto",
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  toggleButton: {
    color: "#ffffff",
  },
  closeButton: {
    color: "#ffffff",
  },
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, width: "100vw", height: "100vh",
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 99999,
  },
  image: {
    maxWidth: "90vw", maxHeight: "80vh",
    borderRadius: "10px",
    boxShadow: "0 0 25px rgba(255,255,255,0.3)",
  },
  navBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "2rem",
    cursor: "pointer",
    padding: "0 1rem",
    userSelect: "none",
  },
  closeBtn: {
    position: "absolute",
    top: "20px", right: "30px",
    fontSize: "1.5rem",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  downloadBtn: {
    position: "absolute",
    bottom: "30px",
    background: "#333",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  content: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },  
};



export default AIPostBuilder;
