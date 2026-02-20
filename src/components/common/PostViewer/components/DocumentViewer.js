import React from 'react';

const DocumentViewer = ({ documentUrl }) => {
  return (
    <iframe
      src={documentUrl}
      title="Document Viewer"
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  );
};

export default DocumentViewer;
