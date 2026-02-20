import React, { useState } from "react";
import TerminalComponent from "./TerminalComponent";
import OutputComponent from "./OutputComponent";
import ProblemsComponent from "./ProblemsComponent";
import PortsComponent from "./PortsComponent";
import "../styles/TerminalTabs.css";

const TerminalTabs = ({ socket, containerId }) => {
  const [activeTab, setActiveTab] = useState("TERMINAL");

  const tabs = [
    { name: "PROBLEMS", count: 1 },
    { name: "OUTPUT" },
    { name: "DEBUG CONSOLE" },
    { name: "TERMINAL" },
    { name: "PORTS", count: 2 },
    { name: "AZURE" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "PROBLEMS":
        return <ProblemsComponent />;
      case "OUTPUT":
        return <OutputComponent />;
      case "DEBUG CONSOLE":
        return <div>Debug console is empty.</div>;
      case "TERMINAL":
        return containerId ? (
          <TerminalComponent socket={socket} containerId={containerId} />
        ) : (
          <div>Loading Terminal...</div>
        );
      case "PORTS":
        return <PortsComponent />;
      case "AZURE":
        return <div>Azure cloud information.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="terminal-tabs-container">
      {/* Tabs Header */}
      <div className="tabs-header">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`tab-header-item ${activeTab === tab.name ? "active" : ""}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
            {tab.count && <span className="tab-count">{tab.count}</span>}
          </div>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="tabs-content">{renderTabContent()}</div>
    </div>
  );
};

export default TerminalTabs;
