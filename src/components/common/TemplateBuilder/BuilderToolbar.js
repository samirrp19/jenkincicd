import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BuilderToolbar = () => {
  const handleSave = () => {
    console.log('Save clicked');
  };

  const handleView = () => {
    console.log('View clicked');
  };

  return (
    <div>
      <Tooltip title="Save Template" arrow>
        <IconButton color="primary" onClick={handleSave}>
          <SaveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="View Source" arrow>
        <IconButton color="primary" onClick={handleView}>
          <CodeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Live Preview" arrow>
        <IconButton color="primary">
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default BuilderToolbar;
