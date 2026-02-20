// components/ImagePreviewModal.jsx
import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImagePreviewModal = ({ open, onClose, imageUrl }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "90vw",
        maxHeight: "90vh",
        bgcolor: "#fff",
        borderRadius: 2,
        overflow: "auto",
        outline: "none",
        boxShadow: 24,
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>
      <img
        src={imageUrl}
        alt="Preview"
        style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 8 }}
      />
    </Box>
  </Modal>
);

export default ImagePreviewModal;
