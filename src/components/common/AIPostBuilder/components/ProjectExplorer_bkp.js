import React, { useState, useEffect, useCallback } from "react";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";
import "react-complex-tree/lib/style.css";

const ProjectExplorer = ({ socket, userId, containerId, projectName, token }) => {
  const [fileTreeData, setFileTreeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const basePath = `/home/user/projects/${projectName}`;

  /**
   * Utility function to build hierarchical tree data for files and folders
   */
  const buildTreeData = useCallback((data, parentId = "root") => {
    const treeData = {};
    const processNode = (node, parentIndex) => {
      const nodeId = `${parentIndex}-${node.name}`;
      treeData[nodeId] = {
        index: nodeId,
        isFolder: node.isDirectory,
        children: [],
        data: node.name,
      };
  
      if (parentIndex) {
        treeData[parentIndex].children.push(nodeId);
      }
  
      if (node.isDirectory && node.children) {
        node.children.forEach((child) => processNode(child, nodeId));
      }
    };
  
    // Create the root node
    treeData[parentId] = {
      index: parentId,
      isFolder: true,
      children: [],
      data: projectName, // Root node label
    };
  
    // Process all top-level nodes
    data.forEach((item) => processNode(item, parentId));
    return treeData;
  }, [projectName]);

  useEffect(() => {
    if (!socket || !socket.connected || !userId || !containerId || !projectName || !token) {
      console.error("Missing required parameters or invalid socket connection.");
      setError("Invalid configuration. Unable to fetch project files.");
      setLoading(false);
      return;
    }

    const fetchDirectoryStructure = () => {
      console.log(`Fetching directory structure for project: ${projectName}`);
      socket.emit("fetchDirectory", basePath, (response) => {
        if (response?.error) {
          console.error("Error fetching directory structure:", response.error);
          setError(response.error);
        } else if (response?.data) {
          console.log("Directory structure fetched:", response.data);
          const cleanedData = buildTreeData(response.data);
          setFileTreeData(cleanedData);
        } else {
          console.error("Unexpected response format:", response);
          setError("No valid directory data received.");
        }
        setLoading(false);
      });
    };

    const handleDirectoryUpdate = (data) => {
      if (data?.path.startsWith(basePath) && data?.files) {
        console.log("Received directory update for project:", data);
        const updatedData = buildTreeData(data.files);
        setFileTreeData((prevTreeData) => ({
          ...prevTreeData,
          ...updatedData,
        }));
      } else {
        console.warn("Received irrelevant directory update:", data);
      }
    };

    const handleError = (error) => {
      console.error("Error received from terminal:", error);
      setError(error);
    };

    fetchDirectoryStructure();
    socket.on("directoryUpdate", handleDirectoryUpdate);
    socket.on("terminalError", handleError);

    return () => {
      socket.off("directoryUpdate", handleDirectoryUpdate);
      socket.off("terminalError", handleError);
    };
  }, [socket, userId, containerId, projectName, token, basePath, buildTreeData]);

  return (
    <div style={styles.container}>
      <h3>Project Explorer</h3>
      {loading ? (
        <p>Loading files...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <UncontrolledTreeEnvironment
          dataProvider={new StaticTreeDataProvider(fileTreeData, (item, data) => ({
            ...item,
            data,
          }))}
          getItemTitle={(item) => item.data}
          viewState={{}}
        >
          <Tree
            treeId="project-explorer"
            rootItem="root"
            treeLabel={`Project: ${projectName}`}
          />
        </UncontrolledTreeEnvironment>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
    backgroundColor: "#1e1e1e",
    color: "#ccc",
    minHeight: "100%",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default ProjectExplorer;
