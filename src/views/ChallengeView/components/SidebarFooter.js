import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SidebarFooter = ({ visibilityFilter, setVisibilityFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [aiEnabled, setAiEnabled] = useState(true);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleVisibilityChange = (type) => (event) => {
    const updated = {
      ...visibilityFilter,
      [type]: event.target.checked
    };
    setVisibilityFilter(updated);
  };

  return (
    <Box px={2} py={1} borderTop="1px solid #ddd" textAlign="center">
      <IconButton onClick={handleOpenMenu}>
        <SettingsIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <Box px={2} py={1}>
          <Typography variant="subtitle2" gutterBottom>
            Preferences
          </Typography>

          <FormControlLabel
            control={<Switch checked={aiEnabled} onChange={(e) => setAiEnabled(e.target.checked)} />}
            label="Enable AI"
          />

          <Divider sx={{ my: 1 }} />

          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Visibility
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={visibilityFilter.private} onChange={handleVisibilityChange('private')} />}
              label="Private"
            />
            <FormControlLabel
              control={<Checkbox checked={visibilityFilter.public} onChange={handleVisibilityChange('public')} />}
              label="Public"
            />
            <FormControlLabel
              control={<Checkbox checked={visibilityFilter.group} onChange={handleVisibilityChange('group')} />}
              label="Group"
            />
          </FormGroup>
        </Box>
      </Menu>
    </Box>
  );
};

export default SidebarFooter;
