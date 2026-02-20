import { Box, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import ExtensionIcon from "@mui/icons-material/Extension";
import DownloadIcon from "@mui/icons-material/Download";

const Sidebar = () => {
  return (
    <Box sx={{ width: "260px", p: 2, borderRight: "1px solid #ddd", height: "100vh" }}>
      <List>
        <ListItem>
          <ListItemText primary="Developer Tools" sx={{ fontWeight: "bold" }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><StorageIcon /></ListItemIcon>
          <ListItemText primary="Database Tools" />
        </ListItem>

        <ListItem>
          <ListItemText primary="Documentation Tools" sx={{ fontWeight: "bold" }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ExtensionIcon /></ListItemIcon>
          <ListItemText primary="AI Code Documentation" />
        </ListItem>

        <ListItem>
          <ListItemText primary="Program Tools" sx={{ fontWeight: "bold" }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ExtensionIcon /></ListItemIcon>
          <ListItemText primary="AI Code Editor" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><DownloadIcon /></ListItemIcon>
          <ListItemText primary="AI Template Tool" />
        </ListItem>
      </List>

      <Button variant="contained" sx={{ mt: 2, width: "100%", bgcolor: "#4CAF50" }}>
        Upgrade Plan 🚀
      </Button>
    </Box>
  );
};

export default Sidebar;
