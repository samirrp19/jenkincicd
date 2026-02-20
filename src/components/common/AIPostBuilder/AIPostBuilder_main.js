import React, { useState, useEffect } from 'react';
import AIToolbarHeader from './components/AIToolbarHeader';
import AIFooter from './components/AIFooter';
import AppViewer from './components/AppViewer';
import SettingsDrawer from './components/AIPrompt/SettingsDrawer';
import ProjectSidebar from './components/ProjectSidebar';
import ProjectExplorer from './components/Panels/ProjectExplorer';
import useAuth from 'hooks/useAuth';

const AIPostBuilder = () => {
  const { user } = useAuth();
  const [isAppViewerOpen, setIsAppViewerOpen] = useState(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const [postType, setPostType] = useState(localStorage.getItem('postType') || 'program');
  const [loadingBuilder, setLoadingBuilder] = useState(false);
  const username = user?.username;

  const toggleAppViewer = () => setIsAppViewerOpen(!isAppViewerOpen);
  const toggleSettingsDrawer = (isOpen) => setIsSettingsDrawerOpen(isOpen);

  const saveSettings = (selectedPostType) => {
    setLoadingBuilder(true);
    setPostType(selectedPostType);
    localStorage.setItem('postType', selectedPostType);
    setTimeout(() => setLoadingBuilder(false), 500); // Simulate loading time
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const savedPostType = localStorage.getItem('postType');
      if (savedPostType) {
        setPostType(savedPostType);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div style={styles.container}>
      {/* Fixed Toolbar Header */}
      <AIToolbarHeader
        toggleAppViewer={toggleAppViewer}
        saveSettings={saveSettings}
        style={styles.toolbar}
      />

      <div style={styles.mainContent}>
        {/* Sidebar with Project Explorer */}
        <div style={styles.sidebar}>
          <ProjectSidebar />
        </div>

        {/* Explorer beside the sidebar */}
        <div style={styles.explorer}>
          <ProjectExplorer username={username} />
        </div>

        {/* Main Content / App Viewer */}
        <div style={styles.mainArea}>
          {loadingBuilder ? (
            <div style={styles.loading}>Loading...</div>
          ) : (
            <AppViewer open={isAppViewerOpen} toggleAppViewer={toggleAppViewer} compiledAppUrl="https://dev.learntute.com" />
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <AIFooter style={styles.footer} />

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsDrawerOpen}
        toggleDrawer={toggleSettingsDrawer}
        saveSettings={saveSettings}
      />
    </div>
  );
};

// Inline styles to ensure the app fits within the viewport and is scroll-free
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Full viewport height
    width: '100vw',  // Full viewport width
    overflow: 'hidden', // Prevent overall scrolling
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    height: 'calc(100vh - 106px)', // Full height minus toolbar and footer
    marginTop: '50px', // Space for the toolbar at the top
    marginBottom: '56px', // Space for the footer at the bottom
    overflow: 'hidden', // Prevent scrolling in main content
  },
  sidebar: {
    flex: '0 0 60px', // Fixed width for the sidebar (icon tabs)
    backgroundColor: '#1e1e1e',
    height: '100%', // Full height inside main content
    borderRight: '1px solid #ccc',
    position: 'relative',
  },
  explorer: {
    flex: '0 0 300px', // Width of the explorer
    backgroundColor: '#252526',
    borderRight: '1px solid #ccc',
    height: '100%', // Full height inside main content
    overflowY: 'auto', // Scroll only within the explorer content
  },
  mainArea: {
    flex: 1, // Take up remaining space
    backgroundColor: '#1e1e1e',
    padding: '20px',
    overflowY: 'auto', // Main area can scroll if needed
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '20px',
    color: '#333',
  },
  toolbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 999,
    backgroundColor: '#1e1e1e',
    borderBottom: '1px solid #ccc',
    height: '50px',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 999,
    backgroundColor: '#1e1e1e',
    borderTop: '1px solid #ccc',
    height: '56px',
  },
};

export default AIPostBuilder;
