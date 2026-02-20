import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Select, MenuItem, Modal, TextField,
  Radio, RadioGroup, FormControlLabel, Switch
} from "@mui/material";
import useAuth from "hooks/useAuth";

const WorkspaceHeader = ({ onViewApp, onTogglePodcast, onToggleDocs }) => {
  const { user } = useAuth();
  const username = user?.username || "";

  const [workspaces, setWorkspaces] = useState([{ templateId: "default", workspace: "default" }]);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openBuildConfirm, setOpenBuildConfirm] = useState(false);

  const [inviteEmail, setInviteEmail] = useState("");
  const [editWorkspaceName, setEditWorkspaceName] = useState(activeWorkspace?.workspace || "");
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const [enablePodcast, setEnablePodcast] = useState(false);
  const [enableDocumentation, setEnableDocumentation] = useState(false);
  const [mode, setMode] = useState("dev");
  const [responseMode, setResponseMode] = useState("plan");

  useEffect(() => {
    setActiveWorkspace(prev => prev || workspaces[0]);
  }, [workspaces]);

  useEffect(() => {
    onTogglePodcast?.(enablePodcast);
  }, [enablePodcast]);

  useEffect(() => {
    onToggleDocs?.(enableDocumentation);
  }, [enableDocumentation]);

  const handleWorkspaceChange = (event) => {
    const selected = workspaces.find(ws => ws.templateId === event.target.value);
    if (selected) {
      setActiveWorkspace(selected);
    }
  };

  const handleCreateWorkspace = () => {
    if (!newWorkspaceName) return;
    const id = `${newWorkspaceName.toLowerCase().replace(/\\s+/g, '-')}-${Date.now()}`;
    const newWorkspace = { templateId: id, workspace: newWorkspaceName };
    setWorkspaces(prev => [...prev, newWorkspace]);
    setNewWorkspaceName("");
    setOpenCreateModal(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, borderBottom: "1px solid #ddd", bgcolor: "#fff" }}>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="h6" fontWeight="bold">Workspace:</Typography>
          <Select value={activeWorkspace?.templateId || ""} onChange={handleWorkspaceChange} size="small">
            {workspaces.map(ws => (
              <MenuItem key={ws.templateId} value={ws.templateId}>
                {ws.workspace}
              </MenuItem>
            ))}
            <MenuItem value="create" onClick={() => setOpenCreateModal(true)}>+ Create Workspace</MenuItem>
          </Select>

          <Typography variant="h6" fontWeight="bold" sx={{ ml: 3 }}>Environment:</Typography>
          <Select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            size="small"
            sx={{ minWidth: 100, backgroundColor: '#f5f5f5', borderRadius: 1 }}
          >
            <MenuItem value="dev">Dev</MenuItem>
            <MenuItem value="prod">Prod</MenuItem>
          </Select>

          <RadioGroup row value={responseMode} onChange={(e) => setResponseMode(e.target.value)} sx={{ ml: 3 }}>
            <FormControlLabel value="plan" control={<Radio />} label="Plan Mode" />
            <FormControlLabel value="execute" control={<Radio />} label="Execute Mode" />
          </RadioGroup>

          <FormControlLabel
            control={<Switch checked={enablePodcast} onChange={() => setEnablePodcast(prev => !prev)} color="primary" />}
            label="📼 Podcast"
          />
          <FormControlLabel
            control={<Switch checked={enableDocumentation} onChange={() => setEnableDocumentation(prev => !prev)} color="primary" />}
            label="📄 Docs"
          />
        </Box>

        <Box>
          <Button variant="outlined" color="primary" onClick={onViewApp}>View App</Button>
          <Button variant="contained" color="success" sx={{ ml: 1 }} onClick={() => setOpenBuildConfirm(true)}>Build App</Button>
          <Button variant="contained" color="error" sx={{ ml: 1 }} onClick={() => setOpenDeleteConfirm(true)}>Delete</Button>
        </Box>
      </Box>

      {/* Modals */}
      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Box sx={modalStyles}>
          <Typography variant="h6">Create Workspace</Typography>
          <TextField fullWidth label="Workspace Name" value={newWorkspaceName} onChange={(e) => setNewWorkspaceName(e.target.value)} sx={{ mt: 2 }} />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleCreateWorkspace}>Create</Button>
        </Box>
      </Modal>

      <Modal open={openInviteModal} onClose={() => setOpenInviteModal(false)}>
        <Box sx={modalStyles}>
          <Typography variant="h6">Manage User Access</Typography>
          <TextField fullWidth label="Enter Email" sx={{ mt: 2 }} value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
          <Button fullWidth variant="contained" sx={{ mt: 2 }}>Invite</Button>
        </Box>
      </Modal>

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box sx={modalStyles}>
          <Typography variant="h6">Edit Workspace</Typography>
          <TextField fullWidth label="Workspace Name" value={editWorkspaceName} onChange={(e) => setEditWorkspaceName(e.target.value)} sx={{ mt: 2 }} />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => setOpenEditModal(false)}>Save Changes</Button>
        </Box>
      </Modal>

      <Modal open={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)}>
        <Box sx={modalStyles}>
          <Typography variant="h6">Are you sure you want to delete this workspace?</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setOpenDeleteConfirm(false)}>No</Button>
            <Button color="error" onClick={() => {
              setWorkspaces(prev => prev.filter(ws => ws.templateId !== activeWorkspace.templateId));
              setOpenDeleteConfirm(false);
              setActiveWorkspace(workspaces[0] || null);
            }}>Yes</Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openBuildConfirm} onClose={() => setOpenBuildConfirm(false)}>
        <Box sx={modalStyles}>
          <Typography variant="h6">Are you sure you want to build this app?</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setOpenBuildConfirm(false)}>Cancel</Button>
            <Button color="success" onClick={() => setOpenBuildConfirm(false)}>Confirm</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WorkspaceHeader;

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  p: 3,
  borderRadius: 2,
  boxShadow: 24,
};
