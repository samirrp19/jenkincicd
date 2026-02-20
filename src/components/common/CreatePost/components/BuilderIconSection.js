import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import FolderIcon from '@mui/icons-material/Folder';
import WebIcon from '@mui/icons-material/Web';
import HelpIcon from '@mui/icons-material/Help';
import DocumentIcon from '@mui/icons-material/Description';

const BuilderIconSection = ({ activeTab, handleBuilderRedirect }) => {
  const getBuilderIcon = () => {
    switch (activeTab) {
      case 0:
        return <CodeIcon />;
      case 1:
        return <FolderIcon />;
      case 2:
        return <WebIcon />;
      case 3:
        return <HelpIcon />;
      case 4:
        return <DocumentIcon />;
      default:
        return null;
    }
  };

  const getBuilderTooltip = () => {
    switch (activeTab) {
      case 0:
        return 'Go to Program Builder';
      case 1:
        return 'Go to Project Builder';
      case 2:
        return 'Go to Template Builder';
      case 3:
        return 'Go to Challenge Builder';
      case 4:
        return 'Go to Document Builder';
      default:
        return '';
    }
  };

  return (
    <>
      <Tooltip title="Preview Post" arrow>
        <IconButton>
          <PreviewIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={getBuilderTooltip()} arrow>
        <IconButton onClick={handleBuilderRedirect}>
          {getBuilderIcon()}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default BuilderIconSection;
