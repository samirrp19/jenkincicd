import React, { useState, useEffect } from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const GitPanel = () => {
  const [changedFiles, setChangedFiles] = useState([]);

  useEffect(() => {
    // Simulated Git status API (Replace with real API call)
    setChangedFiles(["package.json", "index.js", "README.md"]);
  }, []);

  return (
    <Box sx={styles.panel}>
      <h3>Changed Files</h3>
      <List>
        {changedFiles.map((file, index) => (
          <ListItem key={index} button>
            <ListItemText primary={file} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const styles = {
  panel: {
    backgroundColor: "#252526",
    padding: "10px",
    color: "#fff",
    height: "100%",
  },
};

export default GitPanel;
