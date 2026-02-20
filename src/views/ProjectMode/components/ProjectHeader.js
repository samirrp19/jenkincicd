import React from 'react';
import { Button, Avatar, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CodeIcon from '@mui/icons-material/Code';
import CloudQueueIcon from '@mui/icons-material/CloudQueue'; // Cloud icon for "Sandbox template"
import ProjectName from './ProjectName'; // Import ProjectName component
import '../styles/ProjectMode.css'; // Include the custom CSS styles

const ProjectHeader = ({ username }) => {
  // Function to handle the "Save to Store" action
  const handleSaveProject = (projectName) => {
    console.log(`Saving project "${projectName}" for user: ${username}`);
    // You can make the API call to save the project to your backend here
  };

  return (
    <div className="project-header">
      <div className="left-side">
        {/* Logo or icon on the left */}
        <Button className="project-button" startIcon={<CloudQueueIcon />}>
          Sandbox template
        </Button>

        {/* Project folder and template name */}
        <Button className="project-button" startIcon={<FeedbackIcon />}>
          Feedback
        </Button>
      </div>

      {/* Centered ProjectName component */}
      <div className="center-section">
        <ProjectName initialName="Untitled Project" onSave={handleSaveProject} />
      </div>

      <div className="right-side">
        {/* VS Code icon */}
        <Button className="project-button" startIcon={<CodeIcon />}>
          VS Code
        </Button>

        {/* Share button */}
        <Tooltip title="Share">
          <Button className="project-button" startIcon={<ShareIcon />}>
            Share
          </Button>
        </Tooltip>

        {/* Fork button */}
        <Tooltip title="Fork the project">
          <Button className="project-button" startIcon={<ForkRightIcon />}>
            Fork
          </Button>
        </Tooltip>

        {/* User Avatar */}
        <Tooltip title={username}>
          <Avatar className="project-avatar">{username[0].toUpperCase()}</Avatar>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProjectHeader;
