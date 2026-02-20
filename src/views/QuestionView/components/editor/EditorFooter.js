import React from "react"
import { Box, Button } from "@mui/material";
import { Upload } from '@mui/icons-material';

const EditorFooter = (props) => {
  return (
    <div>
      <Box
            sx={{
              p: 2,
              borderTop: '1px solid #ddd',
              boxShadow: 2,
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
            }}
          >
            <Button variant="outlined" startIcon={<Upload />} sx={{ textTransform: 'none' }}>
              Upload Code
            </Button>
            <Box display="flex" gap={2}>
              <Button variant="contained" color="primary" startIcon={<i className="fa fa-play" />}>
                Compile & Run
              </Button>
              <Button variant="contained" color="success" startIcon={<i className="fa fa-check" />}>
                Submit Code
              </Button>
            </Box>
          </Box>
    </div>
  )
};

export default EditorFooter;
