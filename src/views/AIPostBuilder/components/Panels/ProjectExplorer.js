import React, { useState, useEffect } from "react";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";
import "react-complex-tree/lib/style.css";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContextMenu from "../ContextMenu";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectExplorer = ({ username, userId, token, projectId, framework, workspace, frameworkType, appName, onFileClick }) => {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contextMenuPos, setContextMenuPos] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);


  const fetchDirectoryStructure = async () => {
    if (!username || !userId || !token || !projectId || !workspace) {
      console.warn("⚠️ Missing required data to fetch directory structure", {
        username, userId, token, projectId, workspace,
      });
      return;
    }
  
    setLoading(true);
  
    try {
      // Step 1️⃣: Get the dynamic EFS path
      const pathRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/projects/${username}/projects/ai/${projectId}/ws/metadata`,
        {
          headers: { "x-auth-token": token },
          params: { workspace }
        }
      );
  
      const efsPath = pathRes.data.efsPath;
      console.log(efsPath)
      if (!efsPath) throw new Error("No EFS path found for project");
  
      // Step 2️⃣: Fetch the directory structure with real EFS path
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/projects/${username}/projects/ai/${projectId}/ws/directory`,
        {
          headers: { "x-auth-token": token },
          params: { userId, path: efsPath }
        }
      );
  
      // Step 3️⃣: Flatten directory response
      const formatData = (node) => ({
        [node.index]: {
          index: node.index,
          isFolder: node.isFolder,
          children: node.children ? node.children.map((child) => child.index) : [],
          data: node.data,
        },
        ...node.children.reduce((acc, child) => ({
          ...acc,
          ...formatData(child),
        }), {}),
      });
      console.log(formatData)
  
      setItems(formatData(response.data));
    } catch (err) {
      console.error("❌ Error fetching directory:", err);
      setError("Failed to load project directory.");
    } finally {
      setLoading(false);
    }
  };
  
useEffect(() => {
  fetchDirectoryStructure();
}, [username, userId, token, framework, workspace, frameworkType]);

  useEffect(() => {
    console.log("→ ProjectExplorer props updated", {
      framework,
      workspace,
      frameworkType,
    });
  }, [framework, workspace, frameworkType]);

// Update handleContextMenu
const handleContextMenu = (event, item) => {
  event.preventDefault();
  setCurrentPath(item?.index || null);
  setContextMenuPos({ x: event.clientX, y: event.clientY });
};

// Replace refreshDirectory with fetchDirectoryStructure

const handleNewFile = async () => {
  if (!currentPath) return;
  const filePath = currentPath + "/newFile.js";
  try {
    await axios.post(`${apiUrl}/api/projects/${username}/projects/ai/${projectId}/ws/file`, {
      path: filePath,
      content: ""
    }, {
      headers: { "x-auth-token": token }
    });
    fetchDirectoryStructure();
  } catch (err) {
    console.error("Error creating file:", err);
  }
};

const handleNewFolder = async () => {
  if (!currentPath) return;
  const folderPath = currentPath + "/NewFolder";
  try {
    await axios.post(`${apiUrl}/api/projects/${username}/projects/ai/${projectId}/ws/folder`, {
      path: folderPath
    }, {
      headers: { "x-auth-token": token }
    });
    fetchDirectoryStructure();
  } catch (err) {
    console.error("Error creating folder:", err);
  }
};

const handleDelete = async () => {
  if (!currentPath) return;
  try {
    await axios.delete(`${apiUrl}/api/projects/${username}/projects/ai/${projectId}/ws/path`, {
      headers: { "x-auth-token": token },
      data: { path: currentPath }
    });
    fetchDirectoryStructure();
  } catch (err) {
    console.error("Error deleting path:", err);
  }
};
  
  return (
    <Box sx={styles.container}>
      {/* Sidebar - Project Explorer */}
      <Paper sx={styles.sidebar} elevation={3}>
        <Box sx={styles.header}>
          <Typography variant="subtitle2">Project Explorer</Typography>
          <Tooltip title="Refresh">
            <IconButton size="small" onClick={fetchDirectoryStructure}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={styles.body}>
          <style>
            {`
              :root {
                /* Global Styles for React Complex Tree */
                --rct-color-tree-bg: #252526; /* Background */
                --rct-color-tree-focus-outline: transparent; /* Remove unwanted outlines */
                --rct-color-focustree-item-selected-bg: #3a3a3a !important; /* Fix Selection */
                --rct-color-focustree-item-focused-border: #555; /* Light border */
                --rct-color-focustree-item-draggingover-bg: #3a3a3a;
                --rct-color-focustree-item-draggingover-color: inherit;
                --rct-color-search-highlight-bg: #7821e2;
                --rct-color-drag-between-line-bg: #cf03d6;
                --rct-color-arrow: #b48689;
                --rct-item-height: 30px;
              }
              .rct-tree-item[data-selected="true"] {
                background-color: var(--rct-color-focustree-item-selected-bg) !important;
                color: rgb(11, 8, 8) !important;
                border-radius: 5px;
              }
              .rct-tree-item[data-selected="true"]:not(:focus-within) {
                background-color: var(--rct-color-focustree-item-selected-bg) !important;
              }
              .rct-tree-item:focus-within {
                background-color: var(--rct-color-focustree-item-selected-bg) !important;
              }
              .rct-tree-item:hover {
                background-color: #2d2d2d !important;
              }
              .rct-tree-item:focus {
                outline: none !important;
              }
              .rct-tree-item-container {
                padding-left: 10px !important;
              }
            `}
          </style>

          <Box sx={styles.scrollableBody}>
            <UncontrolledTreeEnvironment
              canDragAndDrop
              canDropOnFolder
              canReorderItems
              dataProvider={new StaticTreeDataProvider(items, (item, data) => ({
                ...item,
                data,
              }))}
              getItemTitle={(item) => (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  onContextMenu={(event) => handleContextMenu(event, item)}
                  onClick={() => !item.isFolder && onFileClick(item.index, item.data)} // Prevent folders from being opened in tabs
                  style={{ cursor: "pointer" }}
                >
                  {item.isFolder ? (
                    <FolderOpenIcon color="primary" />
                  ) : (
                    <InsertDriveFileIcon color="action" />
                  )}
                  {item.data}
                </Box>
              )}
              onSelectItems={(ids) => {
                const selectedId = ids[0];
                if (selectedId && !items[selectedId].isFolder) {
                  onFileClick(items[selectedId].index, items[selectedId].data);
                }
              }}
              viewState={{}}
            >
              <Tree treeId="file-tree" rootItem="root" treeLabel="File Explorer Tree" />
            </UncontrolledTreeEnvironment>
          </Box>
        </Box>
      </Paper>

      {contextMenuPos && (
        <ContextMenu
          position={contextMenuPos}
          onClose={() => setContextMenuPos(null)}
          onNewFile={handleNewFile}
          onNewFolder={handleNewFolder}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    height: "100%", // Ensure container height is defined
    backgroundColor: "#181818",
    color: "#ccc",
  },
  sidebar: {
    backgroundColor: "#1e1e1e", // Dark Sidebar
    color: "#ccc",
    borderRight: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    height: "100%", // Ensure sidebar height is defined
    overflow: "hidden",
  },
  header: {
    height: "40px",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #333",
  },
  body: {
    flexGrow: 1,
    padding: "8px",
    display: "flex", // Ensure body behaves as a flex container
    flexDirection: "column", // Ensure vertical stacking
    overflow: "hidden", // This controls overall scrolling behavior
  },
  scrollableBody: {
    overflowY: "auto", // Enables vertical scrolling
    maxHeight: "calc(100vh - 40px)", // Deduct the header height from the viewport
  },
};

export default ProjectExplorer;
