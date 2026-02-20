import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";

const WorkspaceMembers = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: 3, width: "100%", textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold">Invites</Typography>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      >
        <Tab label="Users" />
        <Tab label="Groups" />
      </Tabs>

      {/* Content Based on Active Tab */}
      {activeTab === 0 ? (
        <Box sx={{ mt: 5 }}>
          <img
            src="/notes_empty.png"
            alt="No User invites"
            style={{ width: "150px", opacity: 0.7 }}
          />
          <Typography sx={{ mt: 2, fontSize: "16px", fontWeight: "bold", color: "#666" }}>
            No User invites at the moment
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 5 }}>
          <img
            src="/notes_empty.png"
            alt="No Groups invites"
            style={{ width: "150px", opacity: 0.7 }}
          />
          <Typography sx={{ mt: 2, fontSize: "16px", fontWeight: "bold", color: "#666" }}>
            No Groups invites at the moment
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WorkspaceMembers;
