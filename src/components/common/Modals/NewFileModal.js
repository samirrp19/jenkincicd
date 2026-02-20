import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, FormControl, InputLabel, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const NewFileModal = ({ show, handleClose, handleSave, username, token }) => {
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('python');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);  // Add loading state

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleSaveClick = async () => {
    setSaving(true);  // Start loading
    const newFile = {
      name: fileName,
      type: fileType,
      content: content,
    };

    try {
      const response = await axios.post(`${apiUrl}/api/store/${username}/documents/new`, newFile, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.document) {
        const createdDocument = {
          documentName: response.data.document.fileName || fileName,  // Ensure this is correct
          mimeType: response.data.document.mimeType,
          fileUrl: response.data.document.fileUrl,
          uploadedAt: response.data.document.uploadedAt,
        };
        handleSave(createdDocument);  // Pass the correct file name
      }
    } catch (error) {
      console.error('Error creating new document:', error);
      alert('Failed to create document');
    } finally {
      setSaving(false);  // End loading
      handleClose();
    }
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Document</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel>File Type</InputLabel>
            <Select
              value={fileType}
              onChange={handleFileTypeChange}
              label="File Type"
            >
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="java">Java</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Content"
            multiline
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveClick} color="primary" disabled={saving}>
          {saving ? <CircularProgress size={20} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewFileModal;
