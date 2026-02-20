// components/VideoPreviewModal.jsx
import React from "react";
import { Modal, Box } from "@mui/material";

const VideoPreviewModal = ({ open, onClose, videoUrl }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "black",
          borderRadius: 2,
          boxShadow: 24,
          outline: "none",
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
      >
        <video
          src={videoUrl}
          controls
          autoPlay
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
        />
      </Box>
    </Modal>
  );
};

export default VideoPreviewModal;
