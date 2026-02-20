import React from 'react';
import '../styles/TerminalTabs.css';

const PortsComponent = () => {
  return (
    <div className="tabs-content">
      <p>No forwarded ports. Forward a port to access your locally running services over the internet.</p>
      <button className="ports-button">Forward a Port</button>
    </div>
  );
};

export default PortsComponent;
