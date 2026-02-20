import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const apiUrl = process.env.REACT_APP_API_URL;

const CreateGroupPost = ({ onPostCreated, username, token, groupId }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postContent, setPostContent] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [visibility, setVisibility] = useState('public');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      setVisibility('public');
      handleClose();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleOpen}>
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
        <TextField
          placeholder="Create a group post"
          variant="outlined"
          fullWidth
          readOnly
          InputProps={{
            readOnly: true,
            sx: { cursor: 'pointer' },
          }}
        />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Create Group Post @{username}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <FormControl fullWidth margin="normal">
              <TextField
                select
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="go">Go</MenuItem>
                <MenuItem value="csharp">C#</MenuItem>
                <MenuItem value="php">PHP</MenuItem>
              </TextField>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Post Content</FormLabel>
              <Editor
                height="300px"
                language={language}
                theme="vs-dark"
                value={postContent}
                onChange={(newValue) => setPostContent(newValue)}
                options={{
                  selectOnLineNumbers: true,
                  automaticLayout: true,
                }}
              />
            </FormControl>
            <FormControl margin="normal">
              <FormLabel>Visibility</FormLabel>
              <RadioGroup
                row
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <FormControlLabel value="public" control={<Radio />} label="Public" />
                <FormControlLabel value="private" control={<Radio />} label="Private" />
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateGroupPost;
