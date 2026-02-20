import React from 'react';
import { useLocation } from 'react-router-dom';
import ExplorerContainer from './components/ExplorerContainer'; // Explorer handles SplitPane internally
import SidebarContainer from './components/SidebarContainer';
import ProjectHeader from './components/ProjectHeader'; // Import the header component
import reactTemplate from '../../templates/project/reactTemplate';
import nodeTemplate from '../../templates/project/nodeTemplate'; // Example Node template
import './styles/ProjectMode.css'; // For layout styling

const ProjectMode = ({ username }) => {
  const location = useLocation();

  // Function to get query parameter
  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  const template = getQueryParam('template'); // Get the 'template' from the query parameter

  const getTemplate = () => {
    switch (template) {
      case 'react':
        return reactTemplate;
      case 'node':
        return nodeTemplate;
      // Add more cases for other templates if required
      default:
        return reactTemplate; // Default to React if no template is provided
    }
  };

  const selectedTemplate = getTemplate(); // Get the selected template based on the query parameter

  return (
    <div className="project-mode-wrapper">
      {/* Add the ProjectHeader on top */}
      <ProjectHeader username={username} />

      <div className="project-mode-container">
        {/* SidebarContainer on the left */}
        <SidebarContainer />

        {/* ExplorerContainer which contains SplitPane */}
        <ExplorerContainer username={username} template={selectedTemplate} />
      </div>
    </div>
  );
};

export default ProjectMode;
