import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileInfo = ({ about = "", services = [], skills = [] }) => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);

  const [aboutText, setAboutText] = useState(about);
  const [servicesList, setServicesList] = useState(services);
  const [skillsList, setSkillsList] = useState(skills);

  return (
    <>
      {/* About Section */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">About</Typography>
          <IconButton onClick={() => setOpenAbout(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {aboutText || "No information provided yet."}
        </Typography>
      </Paper>

      {/* Services Section */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Services</Typography>
          <IconButton onClick={() => setOpenServices(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        {servicesList.length > 0 ? (
          <Typography variant="body2" color="text.secondary">
            {servicesList.join(" • ")}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">No services added yet.</Typography>
        )}
      </Paper>

      {/* Skills Section */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Skills</Typography>
          <IconButton onClick={() => setOpenSkills(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        {skillsList.length > 0 ? (
          skillsList.map((skill, idx) => (
            <Box key={idx} mb={1}>
              <Typography variant="body2" fontWeight={500}>
                {skill.name}
              </Typography>
              <LinearProgress variant="determinate" value={skill.level} sx={{ height: 6, borderRadius: 3 }} />
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No skills added yet.</Typography>
        )}
      </Paper>

      {/* Edit About Modal */}
      <Dialog open={openAbout} onClose={() => setOpenAbout(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit About</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            minRows={5}
            fullWidth
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="Write about yourself..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAbout(false)}>Cancel</Button>
          <Button onClick={() => setOpenAbout(false)} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Services Modal */}
      <Dialog open={openServices} onClose={() => setOpenServices(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Services</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            minRows={3}
            fullWidth
            value={servicesList.join(", ")}
            onChange={(e) => setServicesList(e.target.value.split(",").map(item => item.trim()))}
            placeholder="Enter services separated by commas"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenServices(false)}>Cancel</Button>
          <Button onClick={() => setOpenServices(false)} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Skills Modal */}
      <Dialog open={openSkills} onClose={() => setOpenSkills(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Skills</DialogTitle>
        <DialogContent>
          {/* Just simple JSON view for now, can be enhanced */}
          <Typography variant="body2" color="text.secondary">
            (For now, editing skills manually is not implemented. You can extend this easily.)
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSkills(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileInfo;
