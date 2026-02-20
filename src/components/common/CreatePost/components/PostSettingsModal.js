import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Radio, Switch } from '@mui/material';

const PostSettingsModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Post Settings</DialogTitle>
      <DialogContent>
        <RadioGroup>
          <FormControlLabel value="anyone" control={<Radio />} label="Anyone" />
          <FormControlLabel value="connections" control={<Radio />} label="Connections only" />
          <FormControlLabel value="group" control={<Radio />} label="Group" />
        </RadioGroup>

        <FormControlLabel
          control={<Switch />}
          label="Comment control"
          sx={{ marginTop: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Back</Button>
        <Button onClick={onClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostSettingsModal;
