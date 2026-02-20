import React, { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Button, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import templates from "../data/templates";

import CloseIcon from "@mui/icons-material/Close";

const apiUrl = process.env.REACT_APP_API_URL;
const oneaiUrl = process.env.REACT_APP_OPENAPI_URL;

const contextTypes = ["Text Input", "Options List", "Code", "Database", "Image", "Rest API"];

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "white",
  p: 3,
  borderRadius: 2,
  boxShadow: 24,
};

const ContextForms = {
  "Text Input": () => (
    <Box sx={{ mt: 3 }}>
      <Typography fontWeight="bold">Give this context label and description</Typography>
      <TextField fullWidth label="* Title" placeholder="Eg. Packages" sx={{ mt: 2 }} />
      <Typography fontWeight="bold" sx={{ mt: 2 }}>Configure context value</Typography>
      <TextField fullWidth placeholder="Type your default context value here" multiline rows={3} sx={{ mt: 2 }} />
    </Box>
  ),
  "Options List": () => (
    <Box sx={{ mt: 3 }}>
      <Typography fontWeight="bold">Provide a list of options</Typography>
      <TextField fullWidth label="* Title" placeholder="Eg. Options Set" sx={{ mt: 2 }} />
      <TextField fullWidth placeholder="Enter comma-separated values" multiline rows={3} sx={{ mt: 2 }} />
    </Box>
  ),
  "Code": () => (
    <Box sx={{ mt: 3 }}>
      <Typography fontWeight="bold">Provide a code snippet</Typography>
      <TextField fullWidth label="* Title" placeholder="Eg. Sample Code" sx={{ mt: 2 }} />
      <TextField fullWidth placeholder="Paste your code here" multiline rows={5} sx={{ mt: 2 }} />
    </Box>
  ),
  "Database": () => (
    <Box sx={{ mt: 3 }}>
      <Typography fontWeight="bold">Configure database settings</Typography>
      <TextField fullWidth label="Database Name" placeholder="Eg. MySQL Database" sx={{ mt: 2 }} />
      <TextField fullWidth label="Connection String" placeholder="jdbc:mysql://..." sx={{ mt: 2 }} />
    </Box>
  ),
  "Image": () => (
    <Box sx={{ mt: 3 }}>
      <Typography fontWeight="bold">Upload an image</Typography>
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload File
        <input type="file" hidden />
      </Button>
    </Box>
  ),
  "Rest API": () => (
    <Box sx={{ mt: 3 }}>
      <Typography fontWeight="bold">Provide REST API details</Typography>
      <TextField fullWidth label="API Name" placeholder="Eg. User API" sx={{ mt: 2 }} />
      <TextField fullWidth label="Endpoint URL" placeholder="https://api.example.com" sx={{ mt: 2 }} />
    </Box>
  ),
};


const RightSidebarForm = ({ onSave, token, contextData, setContextData, projectPath, packageInfoUrl }) => {
  const [projectName, setProjectName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [availableFrameworks, setAvailableFrameworks] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [contextModalOpen, setContextModalOpen] = useState(false);
  const [selectedContextType, setSelectedContextType] = useState(null);
  const [activePanel, setActivePanel] = useState(null); // "logs" | "packages"
  const [logsContent, setLogsContent] = useState("");
  const [packages, setPackages] = useState([]);
  
    const fetchLogs = async () => {
      try {
        const res = await fetch(`${oneaiUrl}/api/assistant/api/debug/logs?path=${projectPath}`);
        const data = await res.json();
        setLogsContent(data.log || "No logs found.");
      } catch {
        setLogsContent("Failed to load logs.");
      }
    };
  
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${packageInfoUrl}`, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setPackages(data.packages || []);
      } catch (err) {
        console.error("❌ Error fetching packages:", err);
        setPackages([]);
      }
    };
  
    const handleCloseModal = () => {
      setContextModalOpen(false);
      setTimeout(() => setSelectedContextType(null), 300);
    };
  

  useEffect(() => {
    const matchedTemplate = templates.find(t => t.type === selectedType);
    if (matchedTemplate?.frameworks) {
      setAvailableFrameworks(matchedTemplate.frameworks);
      setSelectedFramework(matchedTemplate.frameworks[0]?.value || "");
    } else {
      setAvailableFrameworks([]);
      setSelectedFramework("");
    }
  }, [selectedType]);

  const handleSave = () => {
    if (projectName && selectedType && selectedFramework) {
      onSave({ projectName, selectedType, selectedFramework });
    }
  };

  return (
    <Box sx={{ width: 280, bgcolor: "#fff", borderLeft: "1px solid #ddd", display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
        <Typography variant="h6">Project Settings</Typography>
      </Box>

      <Box sx={{ p: 2, flex: 1, overflowY: "auto" }}>
        <TextField
          label="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          select
          label="App Type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          fullWidth
          margin="normal"
        >
          {[...new Set(templates.map(t => t.type))].map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>

        {availableFrameworks.length > 0 && (
          <TextField
            select
            label="Framework"
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
            fullWidth
            margin="normal"
          >
            {availableFrameworks.map(fw => (
              <MenuItem key={fw.value} value={fw.value}>
                {fw.icon} {fw.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Box>

      <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
       <Typography variant="h6" fontWeight="bold">📂 Workspace Context</Typography>
       {contextData.length > 0 ? (
         contextData.map((context, index) => (
           <Typography key={index} sx={{ mt: 1 }}>{context}</Typography>
         ))
       ) : (
         <Typography sx={{ color: "gray", mt: 2 }}>No context added yet.</Typography>
       )}
       <Button variant="contained" sx={{ mt: 3 }} onClick={() => setContextModalOpen(true)}>+ Add Context</Button>
 
       {activePanel === "logs" && (
         <Box sx={{ mt: 3, maxHeight: "300px", overflowY: "auto", bgcolor: "#f4f4f4", p: 2, borderRadius: "4px", fontSize: "13px" }}>
           <Typography fontWeight="bold">Debug Logs:</Typography>
           <pre style={{ whiteSpace: "pre-wrap" }}>{logsContent}</pre>
         </Box>
       )}
 
       {activePanel === "packages" && (
         <Box sx={{ mt: 3, bgcolor: "#f4f4f4", p: 2, borderRadius: "4px" }}>
           <Typography fontWeight="bold" sx={{ mb: 1 }}>Installed Packages:</Typography>
           {packages.length > 0 ? (
             packages.map((pkg, i) => (
               <Typography key={i} sx={{ fontSize: "13px" }}>
                 {pkg.name} — <strong>{pkg.version}</strong>
               </Typography>
             ))
           ) : (
             <Typography fontSize="13px">No packages found.</Typography>
           )}
         </Box>
       )}
     </Box>

      <Box sx={{ p: 2, borderTop: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
        
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default RightSidebarForm;