import React from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import useAuth from 'hooks/useAuth'; 

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user ? user.username : null;

  const handleHomeClick = (e) => {
    e.stopPropagation();  // Prevent propagation to avoid conflicts
    if (username) {
      navigate(`/${username}/community`);
    }
  };

  const handleGroupsClick = (e) => {
    e.stopPropagation();  // Prevent propagation
    if (username) {
      navigate(`/${username}/groups`);
    }
  };

  const handleMessengerClick = (e) => {
    e.stopPropagation();  // Prevent propagation
    if (username) {
      navigate(`/${username}/messenger`);
    }
  };

  const projectStoreNavItems = [
    {
      icon: <HomeIcon />,
      onClick: handleHomeClick,
      label: "Home",
    },
    {
      icon: <PeopleIcon />,
      onClick: handleGroupsClick,
      label: "Groups",
    },
    {
      icon: <MessageIcon />,
      onClick: handleMessengerClick,
      label: "Messages",
    },
  ];

  const rightSectionItems = {
    search: false,
    notifications: true
  };

  return (
    <Topbar 
      navItems={projectStoreNavItems} 
      rightSectionItems={rightSectionItems} 
      logo='/lt-logo.svg' 
    />
  );
};

export default Header;
