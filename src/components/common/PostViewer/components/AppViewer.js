import React from 'react';

const AppViewer = ({ projectId }) => {
  return (
    <div>
      <h2>Project Viewer</h2>
      <p>Display content related to project ID: {projectId}</p>
      {/* Add project-specific details or iframe content here */}
    </div>
  );
};

export default AppViewer;
