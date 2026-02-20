import React from 'react';
import { Tabs, Tab, Grid } from '@mui/material';

const TabsComponent = ({ activeTab, handleTabChange }) => {
  return (
    <Grid item xs={3} sx={{ position: 'sticky', top: 0 }}>
      <Tabs
        orientation="vertical"
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Tab label="Program" />
        <Tab label="Project" />
        <Tab label="Template" />
        <Tab label="Challenge" />
        <Tab label="Document" />
      </Tabs>
    </Grid>
  );
};

export default TabsComponent;
