import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Select, MenuItem, Modal, TextField
} from "@mui/material";
import { Switch, FormControlLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const WorkspaceHeader = ({
  workspaces,
  activeWorkspace,
  setActiveWorkspace,
  fetchWorkspaces,
  onViewApp,
  onTogglePodcast,
  onToggleDocs
}) => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const { projectId, templateId } = useParams();
  const username = user?.username || "";

  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openBuildConfirm, setOpenBuildConfirm] = useState(false);

  const [inviteEmail, setInviteEmail] = useState("");
  const [editWorkspaceName, setEditWorkspaceName] = useState(activeWorkspace?.name || "");
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const [enablePodcast, setEnablePodcast] = useState(false);
  const [enableDocumentation, setEnableDocumentation] = useState(false);

  const [mode, setMode] = useState("dev");



  useEffect(() => {
    if (activeWorkspace) {
      setEditWorkspaceName(activeWorkspace.name);
      localStorage.setItem("activeWorkspace", JSON.stringify(activeWorkspace));
    }
  }, [activeWorkspace]);

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
      navigate(`/${username}/projects/ai/${projectId}/ws/${selected.templateId}`);
    }
  };

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName) return;
    try {
      const res = await fetch(`${apiUrl}/api/${username}/projects/ai/${projectId}/ws/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ name: newWorkspaceName })
      });
      if (res.ok) {
        fetchWorkspaces();
        setOpenCreateModal(false);
        setNewWorkspaceName("");
      }
    } catch (err) {
      console.error("Error creating workspace:", err);
    }
  };

  const handleBuildApp = async () => {
    try {
      const res = await fetch(
        `${apiUrl}/api/projects/${username}/projects/ai/${projectId}/${activeWorkspace.templateId}`,
        { headers: { "x-auth-token": token } }
      );

      const data = await res.json();

      if (!res.ok || !data.workspace) {
        console.error("❌ Failed to fetch workspace metadata");
        return;
      }

      const { workspace, projectName } = data;
      const { frameworkType, efsPath } = workspace;

      if (!frameworkType) {
        console.error("❌ frameworkType is missing in workspace object");
        console.log("Workspace:", workspace);
        return;
      }

      const buildRes = await fetch(
        `${apiUrl}/api/projects/${username}/projects/ai/${projectId}/${activeWorkspace.templateId}/${frameworkType}/build`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
          },
          body: JSON.stringify({
            basePath: efsPath,
            appName: projectName,
            frameworkType: frameworkType
          })
        }
      );

      if (buildRes.ok) {
        console.log("✅ App build and deploy triggered");
      } else {
        console.error("❌ Failed to trigger app build/deploy");
      }
    } catch (err) {
      console.error("❌ Error triggering build:", err);
    }
  };

  const handleEditWorkspace = async () => {
    if (!editWorkspaceName || !activeWorkspace) return;
    try {
      const res = await fetch(`${apiUrl}/api/${username}/projects/ai/${projectId}/ws/${activeWorkspace.templateId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ name: editWorkspaceName })
      });
      if (res.ok) {
        fetchWorkspaces();
        setOpenEditModal(false);
      }
    } catch (err) {
      console.error("Error editing workspace:", err);
    }
  };

  const handleDeleteWorkspace = async () => {
    try {
      await fetch(`${apiUrl}/api/${username}/projects/ai/${projectId}/ws/${activeWorkspace.templateId}`, {
        method: "DELETE",
        headers: { "x-auth-token": token }
      });
      fetchWorkspaces();
      setOpenDeleteConfirm(false);
    } catch (err) {
      console.error("Error deleting workspace:", err);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, borderBottom: "1px solid #ddd", backgroundColor: "#fff" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mr: 2 }}>Workspace:</Typography>
          <Select value={activeWorkspace?.templateId || ""} onChange={handleWorkspaceChange} size="small">
            {workspaces.length > 0
              ? workspaces.map(ws => (
                  <MenuItem key={ws.templateId} value={ws.templateId}>
                    {ws.workspace}
                  </MenuItem>
                ))
              : <MenuItem disabled>No Workspaces</MenuItem>}
            <MenuItem value="create" onClick={() => setOpenCreateModal(true)}>+ Create Workspace</MenuItem>
          </Select>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mr: 2 }}>Environment:</Typography>
            
            <FormControlLabel
              control={
                <Select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  size="small"
                  sx={{ minWidth: 100, ml: 2, color: '#000', backgroundColor: '#f5f5f5', borderRadius: 1 }}
                >
                  <MenuItem value="dev">Dev</MenuItem>
                  <MenuItem value="prod">Prod</MenuItem>
                </Select>
              }
            />
            <FormControlLabel
              control={<Switch checked={enablePodcast} onChange={() => setEnablePodcast(prev => !prev)} color="primary" />}
              label="📼 Podcast"
              sx={{ mr: 2 }}
            />
            <FormControlLabel
              control={<Switch checked={enableDocumentation} onChange={() => setEnableDocumentation(prev => !prev)} color="primary" />}
              label="📄 Docs"
            />
          </Box>
        </Box>

        <Box>
          <Button variant="outlined" color="primary" onClick={onViewApp}>View App</Button>
          <Button variant="contained" color="success" sx={{ ml: 1 }} onClick={() => setOpenBuildConfirm(true)}>Build App</Button>
          <Button variant="contained" color="error" sx={{ ml: 1 }} onClick={() => setOpenDeleteConfirm(true)}>Delete</Button>
        </Box>
      </Box>

      {/* Confirm Build Modal */}
      <Modal open={openBuildConfirm} onClose={() => setOpenBuildConfirm(false)}>
        <Box sx={{ ...modalStyles, width: 300 }}>
          <Typography variant="h6">Are you sure you want to build and deploy this app?</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setOpenBuildConfirm(false)}>Cancel</Button>
            <Button color="success" onClick={() => { setOpenBuildConfirm(false); handleBuildApp(); }}>Confirm</Button>
          </Box>
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
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleEditWorkspace}>Save Changes</Button>
        </Box>
      </Modal>

      <Modal open={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)}>
        <Box sx={{ ...modalStyles, width: 300 }}>
          <Typography variant="h6">Are you sure you want to delete this workspace?</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setOpenDeleteConfirm(false)}>No</Button>
            <Button onClick={handleDeleteWorkspace} color="error">Yes</Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Box sx={modalStyles}>
          <Typography variant="h6">Create Workspace</Typography>
          <TextField fullWidth label="Workspace Name" value={newWorkspaceName} onChange={(e) => setNewWorkspaceName(e.target.value)} sx={{ mt: 2 }} />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleCreateWorkspace}>Create</Button>
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
