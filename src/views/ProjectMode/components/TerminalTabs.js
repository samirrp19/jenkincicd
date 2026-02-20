import React, { useState } from 'react';
import TerminalComponent from './TerminalComponent';
import OutputComponent from './OutputComponent';
import ProblemsComponent from './ProblemsComponent';
import PortsComponent from './PortsComponent';
import '../styles/TerminalTabs.css'; // Make sure this CSS is terminal-agnostic

const TerminalTabs = ({ username }) => {  // Receive username as a prop
  const [activeTab, setActiveTab] = useState('TERMINAL'); // Set the default active tab

  const tabs = [
    { name: 'PROBLEMS', count: 1 },
    { name: 'OUTPUT' },
    { name: 'DEBUG CONSOLE' },
    { name: 'TERMINAL' },
    { name: 'PORTS', count: 2 },
    { name: 'AZURE' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'PROBLEMS':
        return <ProblemsComponent />;
      case 'OUTPUT':
        return <OutputComponent />;
      case 'DEBUG CONSOLE':
        return <div>Debug console is empty.</div>;
      case 'TERMINAL':
        return <TerminalComponent username={username} />; // Pass username to TerminalComponent
      case 'PORTS':
        return <PortsComponent />;
      case 'AZURE':
        return <div>Azure cloud information.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="terminal-tabs-container">
      {/* Tabs header */}
      <div className="tabs-header">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`tab-header-item ${activeTab === tab.name ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
            {tab.count && <span className="tab-count">{tab.count}</span>}
          </div>
        ))}
      </div>

      {/* Tab content rendering */}
      <div className="tabs-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TerminalTabs;
