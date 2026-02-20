import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Button, Menu, MenuItem, TextField } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkspaceModal from './WorkspaceModal';
import CreateProjectDrawer from './CreateProjectDrawer';
import ImportProjectDrawer from './ImportProjectDrawer';

const ProjectHeader = ({ userId, username, token }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [createProjectDrawerOpen, setCreateProjectDrawerOpen] = useState(false);
  const [importProjectDrawerOpen, setImportProjectDrawerOpen] = useState(false);

  const openCreateProjectDrawer = () => setCreateProjectDrawerOpen(true);
  const closeCreateProjectDrawer = () => setCreateProjectDrawerOpen(false);

  const handleUserMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);

  const handleAvatarMenuOpen = (event) => setAvatarAnchorEl(event.currentTarget);
  const handleAvatarMenuClose = () => setAvatarAnchorEl(null);

  const openWorkspaceModal = () => setWorkspaceModalOpen(true);
  const closeWorkspaceModal = () => setWorkspaceModalOpen(false);

  const openImportProjectDrawer = () => setImportProjectDrawerOpen(true);
  const closeImportProjectDrawer = () => setImportProjectDrawerOpen(false);

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ zIndex: 1400 }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          {/* ✅ Clickable Icon for Navigation */}
          <IconButton onClick={() => navigate(`/${username}/dashboard`)} sx={{ mr: 1 }}>
            <img src="/icon.svg" alt="VS Code Icon" style={{ height: '24px' }} />
          </IconButton>

          <Typography variant="h6">{username}</Typography>
          <IconButton onClick={handleUserMenuOpen}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleUserMenuClose}>
            <MenuItem onClick={() => { handleUserMenuClose(); openWorkspaceModal(); }}>
              <AddIcon fontSize="small" /> Create Workspace
            </MenuItem>
          </Menu>
        </Box>

        <Box display="flex" alignItems="center" ml="auto">
          <IconButton><NotificationsIcon /></IconButton>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            onClick={openCreateProjectDrawer}
            sx={createButtonStyle}
          >
            Create
          </Button>

          <Button
            startIcon={<GitHubIcon />}
            variant="contained"
            size="small"
            onClick={openImportProjectDrawer}
            sx={importButtonStyle}
          >
            Import
          </Button>

          <TextField variant="outlined" size="small" placeholder="Search in workspace" sx={searchBoxStyle} />

          <IconButton onClick={handleAvatarMenuOpen} sx={{ ml: 2 }}><Avatar /></IconButton>
          <Menu anchorEl={avatarAnchorEl} open={Boolean(avatarAnchorEl)} onClose={handleAvatarMenuClose}>
            <MenuItem onClick={handleAvatarMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleAvatarMenuClose}>Storage</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Modals */}
      <WorkspaceModal open={workspaceModalOpen} onClose={closeWorkspaceModal} />
      <CreateProjectDrawer 
        userId={userId}
        username={username} 
        token={token} 
        open={createProjectDrawerOpen} 
        onClose={closeCreateProjectDrawer} 
      />
      <ImportProjectDrawer 
        open={importProjectDrawerOpen} 
        onClose={closeImportProjectDrawer} 
      />
    </AppBar>
  );
};

const createButtonStyle = {
  ml: 2,
  textTransform: 'none',
  backgroundColor: '#28a745',
  '&:hover': { backgroundColor: '#218838' },
};

const importButtonStyle = {
  ml: 2,
  textTransform: 'none',
  backgroundColor: '#42454a',
  '&:hover': { backgroundColor: '#0069d9', boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)' },
};

const searchBoxStyle = {
  ml: 2,
  minWidth: '200px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#ced4da' },
    '&:hover fieldset': { borderColor: '#adb5bd' },
  },
};

export default ProjectHeader;
