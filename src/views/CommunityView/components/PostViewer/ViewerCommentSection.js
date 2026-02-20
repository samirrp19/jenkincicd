// components/common/Post/PostViewer/ViewerCommentSection.js
import { Box, Typography } from "@mui/material";
import Comments from "./Comments";

const ViewerCommentSection = ({ postId, username }) => {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Recent Comments
      </Typography>
      {/* Optional: you can load separately if needed */}
      <Comments postId={postId} username={username} />
    </Box>
  );
};

export default ViewerCommentSection;
