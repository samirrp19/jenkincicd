import React, { useState, useEffect } from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const ExtensionsPanel = () => {
  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    // Simulated extensions API (Replace with real API)
    setExtensions(["ESLint", "Prettier", "Live Server"]);
  }, []);

  return (
    <Box sx={styles.panel}>
      <h3>Installed Extensions</h3>
      <List>
        {extensions.map((ext, index) => (
          <ListItem key={index} button>
            <ListItemText primary={ext} />
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

export default ExtensionsPanel;
