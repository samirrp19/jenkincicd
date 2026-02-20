import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ChatPromptContainer from 'components/common/ChatPromptContainer/ChatPromptContainer';

const TabSection = ({ tabContent, selectedLanguage, onCodeGenerated }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Tab Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: 'white',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          marginTop: 0,
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="question tabs"
        >
          <Tab label="Statements" />
          <Tab label="Hints" />
          <Tab label="Submission" />
          <Tab label="Solution" />
          <Tab label="Ask A Doubt" />
          <Tab label="AI Support" />
        </Tabs>
      </Box>

      {/* Tab Content Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '16px' }}>
        {value === 5 ? (
          <ChatPromptContainer
            language={selectedLanguage}
            onCodeGenerated={onCodeGenerated}
          />
        ) : (
          tabContent[value]
        )}
      </Box>
    </Box>
  );
};

export default TabSection;
