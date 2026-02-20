import React from 'react';
import Header from 'components/Header';
import ProjectBuilderApp from 'components/common/TemplateBuilder/ProjectBuilderApp';
import Box from '@mui/material/Box';

const ProjectBuilderAppPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ marginTop: '10px' }}> {/* Adjusted marginTop */}
        <ProjectBuilderApp />
      </Box>
    </>
  );
};

export default ProjectBuilderAppPage;
