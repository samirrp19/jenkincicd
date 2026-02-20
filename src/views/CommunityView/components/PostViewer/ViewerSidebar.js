import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Stack,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  ThumbUpOutlined,
  ChatBubbleOutline,
  ShareOutlined,
  WhatsApp,
  InsertEmoticon,
  Image,
  Gif,
  EmojiEmotions,
} from "@mui/icons-material";

const ViewerSidebar = ({ post, username, comment, comments, onCommentChange, onCommentSubmit }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1 }}>
        <Typography variant="caption" color="text.secondary">
          This photo is from a post.
        </Typography>
        <Typography variant="caption" sx={{ color: "#1877F2", fontWeight: 600, cursor: "pointer" }}>
          View post
        </Typography>
      </Box>

      <Divider />

      {/* User Info */}
      <Stack direction="row" spacing={2} alignItems="center" px={2} py={2}>
        <Avatar>{post?.username?.charAt(0).toUpperCase()}</Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{post?.username}</Typography>
          <Typography variant="caption" color="text.secondary">53m • 🌍</Typography>
        </Box>
      </Stack>

      {/* Reactions Row */}
      <Box px={2}>
        <Typography variant="body2" fontWeight={500}>❤️👍 8</Typography>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={4} justifyContent="space-around" py={2}>
        <IconButton><ThumbUpOutlined /></IconButton>
        <IconButton><ChatBubbleOutline /></IconButton>
        <IconButton><WhatsApp /></IconButton>
        <IconButton><ShareOutlined /></IconButton>
      </Stack>

      <Divider />

      {/* Comments Display (if any) */}
      <Box px={2} py={1} flex={1} overflow="auto">
        {(comments || []).map((c, idx) => (
          <Box key={idx} sx={{ mb: 1 }}>
            <Typography variant="body2" fontWeight={500}>{c.username}</Typography>
            <Typography variant="body2" color="text.secondary">{c.text}</Typography>
          </Box>
        ))}
      </Box>

      {/* Comment Input */}
      <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1, borderTop: "1px solid #eee" }}>
        <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{username?.charAt(0).toUpperCase()}</Avatar>
        <Box sx={{ flex: 1, bgcolor: "#f0f2f5", borderRadius: 20, px: 2, py: 1 }}>
          <InputBase
            placeholder={`Comment as ${username}`}
            fullWidth
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onCommentSubmit();
              }
            }}
            sx={{ fontSize: 14 }}
          />
        </Box>
        <Stack direction="row" spacing={1} ml={1}>
          <IconButton><InsertEmoticon fontSize="small" /></IconButton>
          <IconButton><Image fontSize="small" /></IconButton>
          <IconButton><Gif fontSize="small" /></IconButton>
          <IconButton><EmojiEmotions fontSize="small" /></IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewerSidebar;
