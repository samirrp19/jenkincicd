import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Typography,
  Slide,
} from '@mui/material';

const SlideUp = React.forwardRef(function SlideUp(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IncomingCallModal = ({ open, caller, onAccept, onDecline }) => {
  if (!open || !caller) return null;

  const { from = 'Unknown', callType = 'audio', avatar } = caller;

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideUp}
      keepMounted
      onClose={onDecline}
      sx={{
        zIndex: 1600, // Ensure it's above drawers, snackbars, etc.
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        📞 Incoming {callType === 'video' ? 'Video' : 'Audio'} Call
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          p: 3,
        }}
      >
        <Avatar
          src={avatar || '/assets/user.png'}
          sx={{ width: 80, height: 80 }}
        />
        <Typography variant="h6" sx={{ mt: 1 }}>
          {from}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          is calling you...
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
        <Button onClick={onDecline} color="error" variant="outlined">
          Decline
        </Button>
        <Button onClick={onAccept} color="primary" variant="contained" autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IncomingCallModal;
