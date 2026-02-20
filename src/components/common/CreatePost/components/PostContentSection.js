import React from 'react';
import { Grid } from '@mui/material';
import ProgramsCollectorComponent from 'components/common/Collector/ProgramsCollectorComponent';
import ProjectContainer from 'components/common/Collector/ProjectContainer';
import PostTemplateContainer from 'components/common/Collector/PostTemplateContainer';
import ChallengeCollector from 'components/common/Collector/ChallengeCollector';
import DocStoreContainer from 'components/common/Collector/DocStoreContainer';

const PostContentSection = ({ activeTab, username, token, handleProgramSelect, selectedProgram, setSelectedTemplate }) => {
  return (
    <Grid item xs={9}>
      {activeTab === 0 && (
        <ProgramsCollectorComponent
          username={username}
          token={token}
          onProgramSelect={handleProgramSelect}
          selectedProgram={selectedProgram}
        />
      )}
      {activeTab === 1 && <ProjectContainer username={username} token={token} />}
      {activeTab === 2 && <PostTemplateContainer username={username} token={token} onTemplateSelect={setSelectedTemplate} />}
      {activeTab === 3 && <ChallengeCollector username={username} token={token} />}
      {activeTab === 4 && <DocStoreContainer username={username} token={token} />}
    </Grid>
  );
};

export default PostContentSection;
