import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FeedIcon from '@mui/icons-material/Feed';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LiveTvIcon from '@mui/icons-material/LiveTv';

import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import SidebarItem from './SidebarItem';
import FriendListContainer from './FriendListContainer';

const SidebarComponent = ({
  isSidebarOpen,
  toggleSidebar,
  user,
  username,
  token,
  setSelectedUser,
  onInitiateCall // ✅ Add call initiator
}) => {
  return (
    <Box sx={{ width: isSidebarOpen ? '320px' : '80px', backgroundColor: '#f4f4f4', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box sx={{ overflowY: 'auto' }}>
        <SidebarHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Main Nav */}
        <SidebarItem icon={<HomeIcon />} label="Home" isSidebarOpen={isSidebarOpen} />
        <SidebarItem icon={<FeedIcon />} label="Feeds" isSidebarOpen={isSidebarOpen} />
        <SidebarItem icon={<SearchIcon />} label="Search" isSidebarOpen={isSidebarOpen} />
        <SidebarItem icon={<LibraryBooksIcon />} label="Library" isSidebarOpen={isSidebarOpen} />

        <Divider sx={{ my: 1 }} />

        {/* Messenger Modules */}
        <SidebarItem icon={<ForumIcon />} label="Messages" isSidebarOpen={isSidebarOpen} />
        <SidebarItem icon={<GroupIcon />} label="Channels" isSidebarOpen={isSidebarOpen} />
        <SidebarItem icon={<EventIcon />} label="Events" isSidebarOpen={isSidebarOpen} />
        <SidebarItem icon={<VideoCallIcon />} label="Calls" isSidebarOpen={isSidebarOpen} />
        <SidebarItem icon={<InsertDriveFileIcon />} label="Files" isSidebarOpen={isSidebarOpen} />
        <SidebarItem icon={<LiveTvIcon />} label="Go Live" isSidebarOpen={isSidebarOpen} />

        <Divider sx={{ my: 1 }} />
        <Typography sx={{ marginLeft: isSidebarOpen ? '16px' : '8px', fontSize: '14px', fontWeight: 600 }}>
          Friends
        </Typography>

        {/* ✅ Friend List */}
        <FriendListContainer
          isSidebarOpen={isSidebarOpen}
          token={token}
          username={username}
          onSelectUser={setSelectedUser}
          onInitiateCall={onInitiateCall} // ✅ Pass to friends
        />

        <Divider sx={{ my: 1 }} />
        <Typography sx={{ marginLeft: isSidebarOpen ? '16px' : '8px', fontSize: '14px' }}>
          Rooms
        </Typography>
        <SidebarItem icon={<AddIcon />} label="Add Channels" isSidebarOpen={isSidebarOpen} />
      </Box>

      <SidebarFooter isSidebarOpen={isSidebarOpen} user={user} />
    </Box>
  );
};

export default SidebarComponent;
