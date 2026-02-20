import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const FileViewerModal = ({ show, handleClose, documentId, documentName, mimeType, token, username, editMode: initialEditMode }) => {
  const [fileContent, setFileContent] = useState('');
  const [editMode, setEditMode] = useState(initialEditMode); // Start in edit mode if passed as a prop
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFileContent = async () => {
      if (show) {
        setLoading(true);
        try {
          const response = await axios.get(`${apiUrl}/api/store/${username}/documents/${documentId}`, {
            headers: { 'x-auth-token': token },
          });
          setFileContent(response.data.content);
        } catch (error) {
          console.error('Error fetching file content:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFileContent();
  }, [show, documentId, username, token]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `${apiUrl}/api/store/${username}/documents/${documentId}`,
        { content: fileContent },
        {
          headers: { 'x-auth-token': token },
        }
      );
      setEditMode(false);
      handleClose();
    } catch (error) {
      console.error('Error saving file content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        {documentName}
        {!editMode && (
          <IconButton onClick={handleEdit} sx={{ ml: 1 }}>
            <EditIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <TextField
            fullWidth
            multiline
            rows={20}
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            InputProps={{
              readOnly: !editMode,
            }}
          />
        )}
      </DialogContent>
      {editMode && (
        <DialogActions>
          <Button onClick={handleSave} color="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default FileViewerModal;
