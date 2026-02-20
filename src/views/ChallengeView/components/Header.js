import React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../../components/Topbar';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import useAuth from 'hooks/useAuth';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user ? user.username : null;

  const theme = useTheme();

  const handleCreateQuestionClick = () => {
    navigate('/admin/create-question');
  };

  const handleHomeClick = () => {
    if (username) {
      navigate(`/${username}/community`);
    }
  };

  const handleGroupsClick = () => {
    if (username) {
      navigate(`/${username}/groups`);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Define `projectStoreNavItems` without additional `IconButton` wrapping
  const projectStoreNavItems = [
    {
      icon: <HomeIcon />, // Removed the wrapping IconButton
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
      onClick: () => handleNavigate('/messages'),
      label: "Messages",
    },
  ];

  const rightSectionItems = {
    search: false,
    notifications: true,
    buttonText: "Create Question",
    buttonAction: handleCreateQuestionClick,
  };

  return (
    <Topbar navItems={projectStoreNavItems} rightSectionItems={rightSectionItems} logo='/lt-logo.svg' user={user} />
  );
};

export default Header;
