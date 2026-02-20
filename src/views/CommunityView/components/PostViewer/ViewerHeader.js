// components/common/Post/PostViewer/ViewerHeader.js
import { Box, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const ViewerHeader = ({ onClose }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        🚀 App Viewer
      </Typography>
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </Box>
  );
};

export default ViewerHeader;
