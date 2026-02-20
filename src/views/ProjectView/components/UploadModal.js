import React, { useState, useRef } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, CircularProgress, IconButton } from '@mui/material';
import { FaUpload, FaGoogleDrive } from 'react-icons/fa';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const UploadModal = ({ show, handleClose, handleUpload, username, token }) => {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null); // Store the selected file
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileSelection = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const nameWithoutExtension = selectedFile.name.split('.').slice(0, -1).join('.'); // Remove the extension
            setFileName(nameWithoutExtension);
            setFile(selectedFile); // Store the file
        }
    };

    const handleUploadToDocumentStore = async () => {
        if (!file) return;
        setUploading(true);
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post(
                `${apiUrl}/api/store/${username}/documents/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'x-auth-token': token,
                    },
                }
            );
    
            const uploadedDocument = {
                documentName: response.data.document.fileName || fileName, // Ensure this is correct
                mimeType: response.data.document.mimeType,
                fileUrl: response.data.document.fileUrl,
                uploadedAt: response.data.document.uploadedAt,
            };
    
            handleUpload(uploadedDocument); // Pass the correct file name
            setFileName('');
            setFile(null);
            setUploading(false);
            handleClose();
        } catch (error) {
            console.error('Error uploading the document:', error);
            setUploading(false);
            handleUpload(null);
        }
    };

    return (
        <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Upload File</DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="space-around" mb={3}>
                    <Button variant="outlined" startIcon={<FaGoogleDrive />} disabled>
                        Upload from Google Drive
                    </Button>
                    <Button variant="contained" startIcon={<FaUpload />} onClick={triggerFileInput}>
                        Upload from Local
                    </Button>
                </Box>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileSelection} 
                />
                {fileName && (
                    <Box textAlign="center" mt={4}>
                        <Typography variant="body1"><strong>Selected File:</strong> {fileName}</Typography>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained" 
                    color="success" 
                    onClick={handleUploadToDocumentStore} 
                    disabled={!fileName || uploading} // Disable if no file is selected or during upload
                    startIcon={uploading && <CircularProgress size={20} />}
                >
                    {uploading ? 'Uploading...' : 'Upload to Document Store'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadModal;
