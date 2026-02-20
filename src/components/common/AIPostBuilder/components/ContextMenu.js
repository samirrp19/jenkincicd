import React, { useEffect } from "react";
import { Menu, MenuItem, Paper } from "@mui/material";

const ContextMenu = ({ position, onClose, onNewFile, onNewFolder, onDelete }) => {
  useEffect(() => {
    const handleClickOutside = () => onClose(); // Close when clicking outside
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  return (
    <Menu
      open={Boolean(position)}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={position ? { top: position.y, left: position.x } : undefined}
      PaperProps={{
        style: { backgroundColor: "#333", color: "white", width: 180 },
      }}
    >
      <MenuItem onClick={onNewFile}>📄 New File</MenuItem>
      <MenuItem onClick={onNewFolder}>📁 New Folder</MenuItem>
      <MenuItem onClick={onDelete} style={{ color: "red" }}>
        🗑️ Delete
      </MenuItem>
    </Menu>
  );
};

export default ContextMenu;
