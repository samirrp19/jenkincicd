import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const ProfileTabs = ({ value, handleChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        <Tab label="About" />
        <Tab label="Posts" />
        <Tab label="Friends" />
        <Tab label="Projects" />
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
