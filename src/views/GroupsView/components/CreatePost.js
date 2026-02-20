import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  IconButton,
  Avatar,
  Typography,
  Paper,
} from '@mui/material';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useTheme } from '@mui/material/styles';

const apiUrl = process.env.REACT_APP_API_URL;

const CreatePost = ({ onPostCreated, username, token, groupId }) => {
  const theme = useTheme(); // Access the theme
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postContent, setPostContent] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [visibility, setVisibility] = useState('private');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/posts/${username}/groups/${groupId}/posts`,
        {
          title,
          description,
          code: postContent,
          language,
          visibility,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      onPostCreated(response.data);
      setTitle('');
      setDescription('');
      setPostContent('');
      setLanguage('javascript');
      setVisibility('private');
      handleCloseModal();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      {/* Main Input Form (Facebook-like style) */}
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          borderRadius: '16px',
          mb: 3,
          backgroundColor: theme.palette.background.paper, // Use theme background color
          color: theme.palette.text.primary, // Use theme text color
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar
            src="https://via.placeholder.com/40"
            alt={username}
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <TextField
            variant="outlined"
            placeholder={`What's on your mind, ${username}?`}
            onClick={handleShowModal}
            fullWidth
            sx={{
              backgroundColor: theme.palette.background.default, // Dynamic based on theme
              padding: '10px 16px',
              borderRadius: '999px',
              fontSize: '1rem',
              color: theme.palette.text.secondary,
              cursor: 'pointer',
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>

        {/* Action buttons like Facebook (below the input) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton>
            <VideoCallIcon sx={{ color: 'red' }} />
            <Typography sx={{ ml: 1 }}>Live video</Typography>
          </IconButton>
          <IconButton>
            <PhotoLibraryIcon sx={{ color: 'green' }} />
            <Typography sx={{ ml: 1 }}>Photo/video</Typography>
          </IconButton>
          <IconButton>
            <EmojiEmotionsIcon sx={{ color: 'orange' }} />
            <Typography sx={{ ml: 1 }}>Feeling/activity</Typography>
          </IconButton>
        </Box>
      </Paper>

      {/* Modal for creating post */}
      <Dialog open={showModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ backgroundColor: theme.palette.background.paper }}>
          Create Post @{username}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: theme.palette.background.paper }}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                required
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Language"
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="go">Go</MenuItem>
                <MenuItem value="csharp">C#</MenuItem>
                <MenuItem value="php">PHP</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Editor
                height="300px"
                language={language}
                theme={theme.palette.mode === 'dark' ? 'vs-dark' : 'vs-light'} // Set Monaco editor theme
                value={postContent}
                onChange={(newValue) => setPostContent(newValue)}
                options={{
                  selectOnLineNumbers: true,
                  automaticLayout: true,
                }}
              />
            </FormControl>

            <FormControl component="fieldset" margin="normal">
              <InputLabel>Visibility</InputLabel>
              <RadioGroup
                row
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private"
                />
              </RadioGroup>
            </FormControl>

            <DialogActions>
              <Button onClick={handleCloseModal} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePost;
