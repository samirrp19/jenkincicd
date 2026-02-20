import { Stack, Avatar, Box, Typography } from "@mui/material";
import moment from "moment";

const PostHeader = ({ username, createdAt }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Avatar sx={{ bgcolor: "#673ab7" }}>
      {username?.charAt(0).toUpperCase()}
    </Avatar>
    <Box>
      <Typography variant="subtitle1" fontWeight={600}>{username}</Typography>
      <Typography variant="caption" color="text.secondary">
        {moment(createdAt).fromNow()}
      </Typography>
    </Box>
  </Stack>
);

export default PostHeader;
