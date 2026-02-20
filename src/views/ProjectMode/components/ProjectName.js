import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField, Box, ClickAwayListener, Grow, Paper, Popper, Button } from '@mui/material';
import { FaChevronDown, FaCheck, FaEdit } from 'react-icons/fa';

// Styled transparent button to match header component style
const TransparentButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#ffffff', // White color for text
  padding: '5px 10px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px', // Adjust font size
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle hover effect
  },
}));

// Styled dropdown content for a clean look
const DropdownContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#1e1e1e', // Dark background to match header
  color: '#ffffff',
  borderRadius: '4px',
  gap: theme.spacing(2),
  width: '250px', // Adjust width
  zIndex: 1300, // Ensure it appears above the editor (higher z-index)
}));

// Save button styled to look professional
const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#007acc',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#005f99', // Darker hover effect
  },
}));

const ProjectName = () => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('Untitled Project');
  const [editedName, setEditedName] = useState(projectName);
  const [saved, setSaved] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setEditedName(projectName);
    setSaved(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleSave = () => {
    setProjectName(editedName);
    setSaved(true);
    setTimeout(() => {
      setOpen(false);
      setSaved(false);
    }, 1500);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      const inputElement = document.getElementById('project-name-input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [open]);

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {/* Button to display project name and trigger dropdown */}
      <TransparentButton
        ref={anchorRef}
        aria-controls={open ? 'project-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {projectName}
        <FaChevronDown style={{ marginLeft: '8px' }} /> {/* Chevron icon */}
      </TransparentButton>

      {/* Dropdown content */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        modifiers={{
          preventOverflow: {
            enabled: true,
          },
          flip: {
            enabled: false,
          },
        }}
        style={{ zIndex: 1300 }} // Ensuring it's on top of other content
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <DropdownContent>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  {/* Editable project name input */}
                  <TextField
                    id="project-name-input"
                    label="Project Name"
                    variant="outlined"
                    fullWidth
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                      style: {
                        backgroundColor: '#2d2d2d',
                        color: '#ffffff',
                      },
                    }}
                  />

                  {/* Save button */}
                  <SaveButton
                    fullWidth
                    onClick={handleSave}
                    startIcon={saved ? <FaCheck /> : null}
                    sx={{ mt: 2 }}
                  >
                    {saved ? 'Saved!' : 'Save'}
                  </SaveButton>
                </Box>
              </ClickAwayListener>
            </DropdownContent>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default ProjectName;
