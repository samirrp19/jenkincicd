import React from "react";
import {
  Modal,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import ViewerHeader from "./ViewerHeader";
import ViewerSidebar from "./ViewerSidebar";
import ViewerMainContent from "./ViewerMainContent";

const PostViewer = ({
  open,
  onClose,
  post,
  username,
  comment,
  comments,
  isVisible,
  focus,
  onCommentChange,
  onCommentSubmit,
  onFocusChange,
  onLike,
  onToggleComments,
  hasCodeAccess = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!post) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        {/* Left: Post Content Area */}
        <Box
          sx={{
            flex: 2,
            overflowY: "auto",
            p: 2,
          }}
        >
          <ViewerHeader onClose={onClose} />
          <ViewerMainContent post={post} />
        </Box>

        {/* Right: Sidebar */}
        {!isMobile && (
          <>
            <Divider orientation="vertical" flexItem />
            <Box
              sx={{
                flex: 1,
                p: 2,
                bgcolor: theme.palette.background.paper,
                borderLeft: `1px solid ${theme.palette.divider}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ViewerSidebar
                post={post}
                username={username}
                comments={comments}
                comment={comment}
                focus={focus}
                onCommentChange={onCommentChange}
                onCommentSubmit={onCommentSubmit}
                onFocusChange={onFocusChange}
                hasCodeAccess={hasCodeAccess}
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PostViewer;
