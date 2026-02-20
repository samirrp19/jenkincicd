import React from 'react';
import { LanguagePage } from 'views/CompilerView/components/LanguagePage';
import TemplateBuilder from 'components/common/TemplateBuilder/TemplateBuilder';
import ProjectMode from './ProjectMode/ProjectMode'; // Import the ProjectMode component

const AIMainContainer = ({ postType, username, token }) => {
  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
      {/* Dynamically load different builders based on the selected post type */}
      {postType === 'program' && <LanguagePage language="python" />}
      {postType === 'template' && 
        <TemplateBuilder 
          templateId={''}  // For now, pass an empty template ID or fetch it as needed
          username={username} 
          token={token} 
        />
      }
      {postType === 'project' && 
        <ProjectMode 
          username={username}  // Pass the username
        />
      }
      {/* Add other builders based on postType */}
    </div>
  );
};

export default AIMainContainer;
