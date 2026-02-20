// components/common/Post/PostTags.js
import { Stack, Chip } from "@mui/material";

const PostTags = ({ tags }) => {
  if (!tags?.length) return null;

  return (
    <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
      {tags.map((tag, idx) => (
        <Chip
          key={idx}
          label={`#${tag}`}
          size="small"
          variant="outlined"
          color="primary"
        />
      ))}
    </Stack>
  );
};

export default PostTags;
