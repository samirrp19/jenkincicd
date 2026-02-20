import React, { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import TemplateViewer from './components/TemplateViewer';
import CompilerViewer from './components/CompilerViewer';
import AppViewer from './components/AppViewer';
import QuestionViewer from './components/QuestionViewer';
import DocumentViewer from './components/DocumentViewer';
import RightSidebar from './components/RightSidebar';

const PostViewer = ({ post, open, onClose }) => {
  const [comments, setComments] = useState([]); // Comments for the post

  const renderViewer = () => {
    switch (post.postType) {
      case 'template':
        return <TemplateViewer templateUrl={post.templateId.fileUrl} />;
      case 'program':
        return <CompilerViewer code={post.code} language={post.language} />;
      case 'project':
        return <AppViewer projectId={post.projectId} />;
      case 'challenge':
        return <QuestionViewer challengeId={post.challengeId} />;
      case 'document':
        return <DocumentViewer documentUrl={post.documentId.fileUrl} />;
      default:
        return <Typography>Unsupported post type</Typography>;
    }
  };

  return (
    <Modal open={open} onClose={onClose} fullWidth>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          {renderViewer()}
        </Box>
        <Box sx={{ width: 300 }}>
          <RightSidebar postId={post._id} comments={comments} setComments={setComments} />
        </Box>
      </Box>
    </Modal>
  );
};

export default PostViewer;
