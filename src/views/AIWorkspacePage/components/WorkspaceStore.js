import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Grid } from "@mui/material";
import axios from "axios";

const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  if (["pdf"].includes(ext)) return "/file-icons/pdf.png";
  if (["doc", "docx"].includes(ext)) return "/file-icons/doc.png";
  if (["ppt", "pptx"].includes(ext)) return "/file-icons/ppt.png";
  if (["xls", "xlsx"].includes(ext)) return "/file-icons/xlx.png";
  if (["txt"].includes(ext)) return "/file-icons/txt.png";
  return "/file-icons/file.png";
};

const WorkspaceStore = ({ workspaceId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [assets, setAssets] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const [assetRes, videoRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/uploads/assets/${workspaceId}`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/uploads/assets/${workspaceId}/videos`)
        ]);

        const allAssets = assetRes.data || [];
        const allVideos = videoRes.data || [];

        setAssets(allAssets);
        setVideos(allVideos);

        const firstImage = allAssets.find(a => a.type === "image");
        const firstFile = allAssets.find(a => a.type !== "image");
        if (firstImage) setSelectedImage(firstImage.url);
        if (firstFile) setSelectedFile(firstFile);
        if (allVideos.length > 0) setSelectedVideo(allVideos[0]);
      } catch (err) {
        console.error("❌ Failed to fetch assets or videos", err);
      }
    };

    if (workspaceId) fetchAssets();
  }, [workspaceId]);

  const imageAssets = assets.filter(asset => asset.type === "image");
  const fileAssets = assets.filter(asset => asset.type !== "image");

  return (
    <Box sx={{ p: 3, width: "100%", height: "100%", textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold">Workspace Store</Typography>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      >
        <Tab label="Images" />
        <Tab label="Files" />
        <Tab label="Videos" />
      </Tabs>

      {/* === IMAGES === */}
      {activeTab === 0 && (
        imageAssets.length === 0 ? (
          <EmptyMessage text="No Images in the Workspace" />
        ) : (
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                {imageAssets.map((asset, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={asset.url}
                    alt={`Thumbnail ${idx}`}
                    onClick={() => setSelectedImage(asset.url)}
                    sx={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: selectedImage === asset.url ? "3px solid #007bff" : "2px solid #ccc",
                      cursor: "pointer",
                      boxShadow: 2
                    }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              {selectedImage && (
                <Box
                  component="img"
                  src={selectedImage}
                  alt="Selected"
                  sx={{ maxWidth: "100%", maxHeight: "500px", borderRadius: "6px", boxShadow: 3 }}
                />
              )}
            </Grid>
          </Grid>
        )
      )}

      {/* === FILES === */}
      {activeTab === 1 && (
        fileAssets.length === 0 ? (
          <EmptyMessage text="No Files in the Workspace" />
        ) : (
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                {fileAssets.map((asset, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setSelectedFile(asset)}
                    sx={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "6px",
                      border: selectedFile?.url === asset.url ? "3px solid #007bff" : "2px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 2,
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src={getFileIcon(asset.name || "")}
                      alt={`File ${idx}`}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              {selectedFile && (
                <Box sx={{ p: 2 }}>
                  <Typography fontWeight="bold" sx={{ mb: 2 }}>
                    {selectedFile.name || "Selected File"}
                  </Typography>
                  <iframe
                    src={selectedFile.url}
                    title="File Preview"
                    width="100%"
                    height="500px"
                    style={{ border: "1px solid #ccc", borderRadius: "6px" }}
                  ></iframe>
                </Box>
              )}
            </Grid>
          </Grid>
        )
      )}

      {/* === VIDEOS === */}
      {activeTab === 2 && (
        videos.length === 0 ? (
          <EmptyMessage text="No Videos in the Workspace" />
        ) : (
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                {videos.map((video, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setSelectedVideo(video)}
                    sx={{
                      width: "100px",
                      height: "80px",
                      border: selectedVideo?.url === video.url ? "3px solid #007bff" : "2px solid #ccc",
                      borderRadius: "6px",
                      overflow: "hidden",
                      boxShadow: 2,
                      cursor: "pointer",
                      backgroundColor: "#000"
                    }}
                  >
                    <video
                      src={video.url}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      muted
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              {selectedVideo && (
                <Box sx={{ p: 2 }}>
                  <Typography fontWeight="bold" sx={{ mb: 2 }}>
                    {selectedVideo.filename || "Selected Video"}
                  </Typography>
                  <video
                    controls
                    src={selectedVideo.url}
                    width="100%"
                    height="500px"
                    style={{ borderRadius: "6px", boxShadow: 3 }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        )
      )}
    </Box>
  );
};

const EmptyMessage = ({ text }) => (
  <Box sx={{ mt: 4 }}>
    <img src="/notes_empty.png" alt="Empty" style={{ width: 150, opacity: 0.7 }} />
    <Typography sx={{ mt: 2, fontSize: 16, fontWeight: "bold", color: "#666" }}>
      {text}
    </Typography>
  </Box>
);

export default WorkspaceStore;
