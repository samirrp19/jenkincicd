import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const TabsSection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      {/* Sticky Tabs */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: 'white',
          borderBottom: 1,
          borderColor: 'divider',
          mb: 2, // margin below the tabs
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="Practice Tabs">
          <Tab label="All Practice Problems" />
          <Tab label="Recent Contest Problems" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ p: 2 }}>
        {value === 0 && <div>All Practice Problems Content</div>}
        {value === 1 && <div>Recent Contest Problems Content</div>}
      </Box>
    </Box>
  );
};

export default TabsSection;
