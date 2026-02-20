import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AIToolbarHeader from "./components/AIToolbarHeader";
import AIFooter from "./components/AIFooter";
import AppViewer from "./components/AppViewer";
import ProjectSidebar from "./components/ProjectSidebar";
import ProjectExplorer from "./components/Panels/ProjectExplorer";
import SearchPanel from "./components/Panels/SearchPanel";
import GitPanel from "./components/Panels/GitPanel";
import PromptsPanel from "./components/Panels/PromptsPanel";
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

const AIPostBuilder = () => {
  const { username } = useParams();
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

  const queryParams = new URLSearchParams(search);
  const appName = queryParams.get("appName");
  const dynamicAppUrl = `https://${username}-${appName}.app.learntute.com/`;

  // Function to toggle panel visibility
  const togglePanel = (panelName) => {
    setActivePanel((prev) => (prev === panelName ? null : panelName));
    if (panelName === "prompts") setIsDrawerOpen(true); // Open drawer when "prompts" panel is activated
  };

  // Fetch file content from backend
  const fetchFileContent = async (filePath) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/apps/file`,
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
          />
        )}
      </div>

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
        <PromptsPanel
          appId={queryParams.get("postId")} // appId derived from query params
          userId={userId} // userId from useAuth
        />
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

export default AIPostBuilder;
