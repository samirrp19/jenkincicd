import React from "react";
import {
  Box,
  Paper,
  Stack,
  Avatar,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import moment from "moment";
import ReactPlayer from "react-player";

import PostActions from "./PostActions";
import CommentInput from "./PostViewer/CommentInput";
import Comments from "./PostViewer/Comments";

const PostCard = ({
  post,
  username,
  comment,
  comments,
  isVisible,
  focus,
  onCommentChange,
  onCommentSubmit,
  onFocusChange,
  onToggleComments,
  onLike,
  onOpenViewer,
}) => {
  const renderMediaGrid = (screenshots = [], recordings = []) => {
    const media = [
      ...screenshots.map((s) =>
        typeof s === "string" ? { url: s, type: "image" } : { ...s, type: "image" }
      ),
      ...recordings.map((r) =>
        typeof r === "string" ? { url: r, type: "video" } : { ...r, type: "video" }
      ),
    ];

    if (media.length === 0) return null;

    const total = media.length;
    const extraCount = total - 4;
    const visibleMedia = total <= 4 ? media : media.slice(0, 4);

    const getGridStyle = () => {
      if (total === 1) return { gridTemplateColumns: "1fr" };
      if (total === 2) return { gridTemplateColumns: "1fr 1fr" };
      if (total === 3)
        return {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr auto",
          gridTemplateAreas: `"a b" "c c"`,
        };
      return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" };
    };

    return (
      <Box
        sx={{
          display: "grid",
          gap: 1,
          mt: 2,
          borderRadius: 2,
          overflow: "hidden",
          ...getGridStyle(),
        }}
      >
        {visibleMedia.map((item, index) => {
          const isVideo = item.url?.endsWith(".mp4") || item.url?.endsWith(".webm");
          const src = item.url || item.s3Url || item;
          const isLast = index === 3 && total > 4;

          const area =
            total === 3
              ? index === 0
                ? "a"
                : index === 1
                ? "b"
                : "c"
              : undefined;

          return (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
                gridArea: area,
                cursor: "pointer",
              }}
              onClick={onOpenViewer}
            >
              {isVideo ? (
                <ReactPlayer
                  url={src}
                  controls
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              ) : (
                <img
                  src={src}
                  alt={`media-${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}

              {isLast && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    fontWeight: 600,
                  }}
                >
                  +{extraCount}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#ffffff",
        border: "1px solid #eee",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          borderColor: "#ddd",
        },
      }}
    >
      {/* Post Header */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ cursor: "pointer" }} onClick={onOpenViewer}>
        <Avatar sx={{ bgcolor: "#673ab7" }}>
          {post.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {post.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
      </Stack>

      {/* Post Title */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mt: 1, cursor: "pointer" }}
        onClick={onOpenViewer}
      >
        {post.title}
      </Typography>

      {/* Description */}
      {post.description && (
        <Typography
          variant="body1"
          sx={{ color: "text.primary", cursor: "pointer" }}
          onClick={onOpenViewer}
        >
          {post.description}
        </Typography>
      )}

      {/* Media */}
      {renderMediaGrid(post.screenshots, post.recordings)}

      {/* Tags */}
      {post.tags?.length > 0 && (
        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
          {post.tags.map((tag, idx) => (
            <Chip
              key={idx}
              label={`#${tag}`}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={onOpenViewer}
            />
          ))}
        </Stack>
      )}

      {/* Divider */}
      <Divider sx={{ my: 2 }} />

      {/* Post Actions */}
      <PostActions
        likes={post.likes || 0}
        handleLike={onLike}
        handleCommentClick={onToggleComments}
      />

      {/* Conditional Comment Input and Comments */}
      {isVisible && (
        <Box sx={{ mt: 2 }}>
          <CommentInput
            comment={comment}
            handleCommentChange={(e) => onCommentChange(e.target.value)}
            handleCommentSubmit={onCommentSubmit}
            handleKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onCommentSubmit();
              }
            }}
            focusOnComment={focus}
            setFocusOnComment={onFocusChange}
            username={username}
          />
          <Box sx={{ mt: 2 }}>
            <Comments comments={comments} />
          </Box>
        </Box>
      )}

      {/* View App Link */}
      {post.appUrl && (
        <Typography
          variant="body2"
          component="a"
          href={post.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: 500,
            mt: 2,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          🔗 Visit App
        </Typography>
      )}
    </Paper>
  );
};

export default PostCard;
