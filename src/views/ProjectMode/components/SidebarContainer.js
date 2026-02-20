import React, { useState } from 'react';
import '../styles/SidebarContainer.css'; // Sidebar-specific styles
import { FaFolderOpen, FaSearch, FaGitAlt, FaPlayCircle, FaCog, FaUserCircle, FaBoxes } from 'react-icons/fa';

const SidebarContainer = () => {
  const [activeTab, setActiveTab] = useState('explorer');
  
  // Debugging check
  console.log('SidebarContainer is rendering');

  return (
    <div className="sidebar-container">
      {/* Tab buttons */}
      <div className={`sidebar-tab ${activeTab === 'explorer' ? 'active' : ''}`} onClick={() => setActiveTab('explorer')} title="Explorer">
        <FaFolderOpen className="sidebar-icon" />
      </div>
      <div className={`sidebar-tab ${activeTab === 'search' ? 'active' : ''}`} onClick={() => setActiveTab('search')} title="Search">
        <FaSearch className="sidebar-icon" />
      </div>
      <div className={`sidebar-tab ${activeTab === 'git' ? 'active' : ''}`} onClick={() => setActiveTab('git')} title="Source Control">
        <FaGitAlt className="sidebar-icon" />
      </div>
      <div className={`sidebar-tab ${activeTab === 'play' ? 'active' : ''}`} onClick={() => setActiveTab('play')} title="Run and Debug">
        <FaPlayCircle className="sidebar-icon" />
      </div>
      <div className={`sidebar-tab ${activeTab === 'extensions' ? 'active' : ''}`} onClick={() => setActiveTab('extensions')} title="Extensions">
        <FaBoxes className="sidebar-icon" />
      </div>

      <div className="sidebar-spacer"></div>

      <div className={`sidebar-tab ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')} title="Account">
        <FaUserCircle className="sidebar-icon" />
      </div>
      <div className={`sidebar-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')} title="Settings">
        <FaCog className="sidebar-icon" />
      </div>
    </div>
  );
};

export default SidebarContainer;
