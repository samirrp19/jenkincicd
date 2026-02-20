import React from 'react';
import { Box, TextField, IconButton, Tooltip, InputAdornment, Avatar } from '@mui/material';
import { InsertPhoto, SentimentSatisfiedAlt, GifBox, HowToVote, Send } from '@mui/icons-material';
import gravatar from 'gravatar'; // Import gravatar
import { useTheme } from '@mui/material/styles'; // Import useTheme for dynamic theming

const CommentInput = ({ comment, handleCommentChange, handleCommentSubmit, handleKeyPress, focusOnComment, setFocusOnComment, username }) => {
  const theme = useTheme(); // Access the current theme
  const gravatarUrl = gravatar.url(username, { s: '40', d: 'identicon' }); // Generate gravatar URL

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default, // Use theme background color
        padding: '10px 15px',
        borderRadius: '15px',
        margin: '15px',
      }}
      onSubmit={(e) => {
        e.preventDefault(); // Prevent page refresh
        handleCommentSubmit();
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Display User Gravatar */}
        <Avatar src={gravatarUrl} alt={username} sx={{ width: 40, height: 40, mr: 2 }} />

        <TextField
          variant="outlined"
          placeholder={`Comment as ${username}`}
          fullWidth
          value={comment}
          onChange={handleCommentChange}
          onKeyDown={(e) => handleKeyPress(e)}
          sx={{
            backgroundColor: theme.palette.background.paper, // Use theme for background color
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            },
          }}
          InputProps={{
            endAdornment: focusOnComment ? (
              <InputAdornment position="end">
                <IconButton type="button" onClick={handleCommentSubmit}>
                  <Send />
                </IconButton>
              </InputAdornment>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Tooltip title="Add photo/video" arrow>
                  <IconButton>
                    <InsertPhoto />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add emoji" arrow>
                  <IconButton>
                    <SentimentSatisfiedAlt />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add GIF" arrow>
                  <IconButton>
                    <GifBox />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add vote" arrow>
                  <IconButton>
                    <HowToVote />
                  </IconButton>
                </Tooltip>
              </Box>
            ),
          }}
          onFocus={() => setFocusOnComment(true)}
          onBlur={() => setFocusOnComment(false)}
        />
      </Box>

      {focusOnComment && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            mt: 1,
            backgroundColor: theme.palette.background.default, // Use theme for background color
            paddingTop: '5px',
          }}
        >
          <Tooltip title="Add photo/video" arrow>
            <IconButton>
              <InsertPhoto />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add emoji" arrow>
            <IconButton>
              <SentimentSatisfiedAlt />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add GIF" arrow>
            <IconButton>
              <GifBox />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add vote" arrow>
            <IconButton>
              <HowToVote />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default CommentInput;
