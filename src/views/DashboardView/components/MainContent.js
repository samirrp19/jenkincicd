import React from 'react';
import { Box, Typography } from '@mui/material';
import ProjectContainer from 'components/common/Collector/ProjectContainer';
import Prompts from './Prompts';
import DocStoreContainer from 'components/common/Collector/DocStoreContainer';
import PostCollectorComponent from 'components/common/Collector/PostCollectorComponent';
import TemplateContainer from 'components/common/Collector/TemplateContainer';

const MainContent = ({ activeSection, username, token }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
      {activeSection === 'projects' && 
        <ProjectContainer username={username} token={token} />
      }
      {activeSection === 'prompts' && 
        <Prompts username={username} token={token} />
      }
      {activeSection === 'documents' && (
        <DocStoreContainer username={username} token={token} />
      )}
      {activeSection === 'posts' && (
        <PostCollectorComponent username={username} token={token} />
      )}
      {activeSection === 'templates' && (
        <TemplateContainer username={username} token={token} />
      )}

      {!['projects', 'prompts', 'documents', 'posts', 'templates'].includes(activeSection) && (
        <Typography>Select a section to view content</Typography>
      )}
    </Box>
  );
};

export default MainContent;
