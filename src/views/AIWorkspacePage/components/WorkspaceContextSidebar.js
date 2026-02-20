import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const apiUrl = process.env.REACT_APP_API_URL;
const oneaiUrl = process.env.REACT_APP_OPENAPI_URL;

const contextTypes = [
  "Text Input",
  "Options List",
  "Code",
  "Database",
  "Image",
  "Rest API",
];

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



const WorkspaceContextSidebar = ({
  token,
  username,
  projectId,
  workspaceId,
  contextData,
  setContextData,
  projectPath,
  packageInfoUrl,
}) => {
  const [contextModalOpen, setContextModalOpen] = useState(false);
  const [selectedContextType, setSelectedContextType] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    value: "",
    dbName: "",
    connectionString: "",
    apiName: "",
    apiUrl: "",
    caption: "",
    file: null,
  });
  const [activePanel, setActivePanel] = useState(null);
  const [logsContent, setLogsContent] = useState("");
  const [packages, setPackages] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch(
        `${oneaiUrl}/api/assistant/api/debug/logs?path=${projectPath}`
      );
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
          "Content-Type": "application/json",
        },
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setFormState((prev) => ({ ...prev, file }));
  };

  const handleAddContext = async () => {
    const typeMap = {
      "Text Input": "text",
      "Options List": "options",
      "Code": "code",
      "Database": "database",
      "Image": "image",
      "Rest API": "rest_api",
    };
    const type = typeMap[selectedContextType];
  
    const payload = (() => {
      switch (type) {
        case "text":
          return { content: formState.value };
        case "options":
          return { options: formState.value.split(",").map((o) => o.trim()) };
        case "code":
          return { code: formState.value };
        case "database":
          return {
            dbName: formState.dbName,
            connectionString: formState.connectionString,
          };
        case "rest_api":
          return { apiName: formState.apiName, apiUrl: formState.apiUrl };
        case "image":
          return { caption: formState.caption };
        default:
          return {};
      }
    })();
  
    const formData = new FormData();
    formData.append("userId", username);
    formData.append("projectId", projectId);
    formData.append("workspaceId", workspaceId);
    formData.append("type", type);
    formData.append("name", formState.title);
    formData.append("description", "");
    formData.append("payload", JSON.stringify(payload));
    if (type === "image" && formState.file) {
      formData.append("file", formState.file);
    }
  
    // ✅ Debug: Log all formData entries
    console.log("🔍 FormData being sent:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const res = await fetch(
        `${apiUrl}/api/projects/${username}/projects/${projectId}/context/create`,
        {
          method: "POST",
          headers: {
            "x-auth-token": token,
          },
          body: formData,
        }
      );
      const data = await res.json();
  
      if (!res.ok) {
        console.error("❌ Server responded with:", data);
        alert(data.error || "Failed to create context");
        return;
      }
  
      if (data.context) {
        alert("✅ Context saved successfully.");
        setContextData((prev) => [...prev, data.context.name]);
        handleCloseModal();
      }
    } catch (error) {
      console.error("❌ Error adding context:", error);
      alert("Error sending context to server");
    }
  };
  
  return (
    <Box
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderLeft: "1px solid #ddd",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
        <Typography variant="h6" fontWeight="bold">
          📂 Workspace Context
        </Typography>
        {contextData.length > 0 ? (
          contextData.map((context, index) => (
            <Typography key={index} sx={{ mt: 1 }}>
              {context}
            </Typography>
          ))
        ) : (
          <Typography sx={{ color: "gray", mt: 2 }}>
            No context added yet.
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => setContextModalOpen(true)}
        >
          + Add Context
        </Button>

        {activePanel === "logs" && (
          <Box
            sx={{
              mt: 3,
              maxHeight: "300px",
              overflowY: "auto",
              bgcolor: "#f4f4f4",
              p: 2,
              borderRadius: "4px",
              fontSize: "13px",
            }}
          >
            <Typography fontWeight="bold">Debug Logs:</Typography>
            <pre style={{ whiteSpace: "pre-wrap" }}>{logsContent}</pre>
          </Box>
        )}

        {activePanel === "packages" && (
          <Box sx={{ mt: 3, bgcolor: "#f4f4f4", p: 2, borderRadius: "4px" }}>
            <Typography fontWeight="bold" sx={{ mb: 1 }}>
              Installed Packages:
            </Typography>
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

      <Box
        sx={{
          borderTop: "1px solid #eee",
          display: "flex",
          justifyContent: "space-around",
          p: 1,
          bgcolor: "#fafafa",
        }}
      >
        <Button
          onClick={() => {
            setActivePanel("logs");
            fetchLogs();
          }}
          size="small"
        >
          🪵 Logs
        </Button>
        <Button
onClick={() => {
            setActivePanel("packages");
            fetchPackages();
          }}
          size="small"
        >
          📦 Packages
        </Button>
      </Box>

      <Modal open={contextModalOpen} onClose={handleCloseModal}>
        <Box sx={{ ...modalStyles }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Add Context</Typography>
            <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
          </Box>
          <Typography sx={{ mb: 2, fontWeight: "bold" }}>Select Context Type</Typography>
          <Box sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            bgcolor: "#F8F8FB",
            p: 2,
            borderRadius: "10px"
          }}>
            {contextTypes.map((type) => (
              <Button
                key={type}
                variant="outlined"
                onClick={() => setSelectedContextType(type)}
                sx={{
                  border: "1px solid #5A5CD6",
                  color: "#5A5CD6",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "14px",
                  borderRadius: "6px",
                  minWidth: "110px",
                  padding: "8px 12px",
                  whiteSpace: "nowrap",
                }}
              >
                {type}
              </Button>
            ))}
          </Box>

          {selectedContextType && (
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                name="title"
                label="* Title"
                placeholder="Enter context title"
                value={formState.title}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              {selectedContextType === "Text Input" && (
                <TextField
                  fullWidth
                  name="value"
                  placeholder="Type your default context value here"
                  multiline
                  rows={3}
                  value={formState.value}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
              )}
              {selectedContextType === "Options List" && (
                <TextField
                  fullWidth
                  name="value"
                  placeholder="Enter comma-separated values"
                  multiline
                  rows={3}
                  value={formState.value}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
              )}
              {selectedContextType === "Code" && (
                <TextField
                  fullWidth
                  name="value"
                  placeholder="Paste your code here"
                  multiline
                  rows={5}
                  value={formState.value}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
              )}
              {selectedContextType === "Database" && (
                <>
                  <TextField
                    fullWidth
                    name="dbName"
                    label="Database Name"
                    placeholder="Eg. MySQL Database"
                    value={formState.dbName}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    name="connectionString"
                    label="Connection String"
                    placeholder="jdbc:mysql://..."
                    value={formState.connectionString}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                  />
                </>
              )}
              {selectedContextType === "Rest API" && (
                <>
                  <TextField
                    fullWidth
                    name="apiName"
                    label="API Name"
                    placeholder="Eg. User API"
                    value={formState.apiName}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    name="apiUrl"
                    label="Endpoint URL"
                    placeholder="https://api.example.com"
                    value={formState.apiUrl}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                  />
                </>
              )}
              {selectedContextType === "Image" && (
                <>
                  <TextField
                    fullWidth
                    name="caption"
                    label="Image Caption"
                    placeholder="Optional caption for image"
                    value={formState.caption}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                  />
                  <Button variant="contained" component="label" sx={{ mt: 2 }}>
                    Upload Image
                    <input type="file" hidden onChange={handleFileUpload} />
                  </Button>
                </>
              )}
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            {selectedContextType && (
              <Button variant="outlined" onClick={() => setSelectedContextType(null)}>
                ⬅ Back to Selection
              </Button>
            )}
            {selectedContextType && (
              <Button variant="contained" onClick={handleAddContext}>
                ✔ Add context
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default WorkspaceContextSidebar;
