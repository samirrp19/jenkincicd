import React, { useState, useRef } from "react";
import { Grid, Card, Typography, Box, Modal, TextField, Button, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import templates from "./templates"; // Import templates from separate file
import useAuth from "hooks/useAuth";

const apiUrl = process.env.REACT_APP_API_URL;

const TemplateSelection = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const username = user?.username || "";
  const { projectId } = useParams(); // Get username and projectId from URL
  const [openWorkspaceModal, setOpenWorkspaceModal] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [openFrameworkSelector, setOpenFrameworkSelector] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [frameworkPosition, setFrameworkPosition] = useState({ top: 0, left: 0 });
  const selectedCardRef = useRef(null);

  const handleCreateWorkspace = async () => {
    if (!workspaceName || !token || !selectedFramework) {
      console.error("❌ Missing required data: workspaceName, framework or token");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/projects/${username}/projects/ai/${projectId}/ws/create`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-auth-token": token // ✅ Pass auth token for authentication
        },
        body: JSON.stringify({
          workspace: workspaceName,
          frameworkType: selectedTemplate?.type,
          framework: selectedFramework.value,
          dbType: selectedTemplate?.defaultDb || null,
          contextId: '67fedb735afd3e624ab6c9a8',
          postType: selectedTemplate?.postType 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Failed to create workspace:", errorData);
        return;
      }

      // ✅ Get the newly created `templateId` from backend response
      const { templateId } = await response.json();

      console.log("✅ Workspace created successfully, navigating to:", `/${username}/projects/ai/${projectId}/ws/${templateId}`);
      navigate(`/${username}/projects/ai/${projectId}/ws/${templateId}`);
    } catch (error) {
      console.error("❌ Error creating workspace:", error);
    }
  };

  // Handles template selection
  const handleTemplateClick = (template, event) => {
    if (template.frameworks) {
      setSelectedTemplate(template);
      setOpenFrameworkSelector(true);
      selectedCardRef.current = event.currentTarget;

      const rect = event.currentTarget.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const trayWidth = 400;
      const trayHeight = 300;

      let left = rect.right + 10;
      let top = rect.top;

      if (left + trayWidth > windowWidth) {
        left = rect.left - trayWidth - 10;
      }
      if (top + trayHeight > windowHeight) {
        top = windowHeight - trayHeight - 20;
      }

      setFrameworkPosition({ top, left });
    } else {
      setSelectedTemplate(template);
      setOpenWorkspaceModal(true);
    }
  };

  // Handles framework selection
  const handleFrameworkSelect = (framework) => {
    setSelectedFramework(framework);
    setOpenFrameworkSelector(false);
    setOpenWorkspaceModal(true);
  };

  return (
    <Box sx={{ p: 3, width: "100%", textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Select Your Template:
      </Typography>

      {/* First Row - Centered with gaps */}
      <Grid container spacing={3} justifyContent="center">
        {templates.slice(0, 3).map((template, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                p: 3,
                borderRadius: "10px",
                textAlign: "center",
                background: template.color,
                color: template.textColor,
                cursor: "pointer",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={(e) => handleTemplateClick(template, e)}
            >
              <Typography variant="h5">{template.icon}</Typography>
              <Typography variant="h6" fontWeight="bold">{template.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Second Row - Full Width */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        {templates.slice(3, 6).map((template, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                p: 3,
                borderRadius: "10px",
                textAlign: "center",
                background: template.color,
                color: template.textColor,
                cursor: "pointer",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={(e) => handleTemplateClick(template, e)}
            >
              <Typography variant="h5">{template.icon}</Typography>
              <Typography variant="h6" fontWeight="bold">{template.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Third Row - 4 Per Row */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        {templates.slice(6).map((template, index) => (
          <Grid item xs={12} sm={3} key={index}>
            <Card
              sx={{
                p: 3,
                borderRadius: "10px",
                textAlign: "center",
                background: template.color,
                color: template.textColor,
                cursor: "pointer",
                "&:hover": { transform: "scale(1.03)" },
              }}
              onClick={(e) => handleTemplateClick(template, e)}
            >
              <Typography variant="h5">{template.icon}</Typography>
              <Typography variant="h6" fontWeight="bold">{template.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Workspace Name Modal */}
      <Modal open={openWorkspaceModal} onClose={() => setOpenWorkspaceModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 24 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Create Workspace</Typography>
            <IconButton onClick={() => setOpenWorkspaceModal(false)}><CloseIcon /></IconButton>
          </Box>
          <TextField
            fullWidth
            label="Workspace name"
            placeholder="Eg. My workspace"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleCreateWorkspace}>
            Create
          </Button>
        </Box>
      </Modal>

      {/* Framework Selector - Tray beside the selected item */}
      {openFrameworkSelector && selectedTemplate && (
        <Box sx={{
          position: "absolute", top: frameworkPosition.top, left: frameworkPosition.left,
          width: "400px", bgcolor: "white", p: 3, borderRadius: "10px", boxShadow: 24, zIndex: 1100
        }}>
          <Grid container spacing={2}>
            {selectedTemplate.frameworks.map((fw, index) => (
              <Grid item xs={6} key={index}>
                <Card sx={{ p: 2, textAlign: "center", cursor: "pointer" }} onClick={() => handleFrameworkSelect(fw)}>
                  <Typography variant="h5">{fw.icon}</Typography>
                  <Typography variant="h6">{fw.name}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default TemplateSelection;
