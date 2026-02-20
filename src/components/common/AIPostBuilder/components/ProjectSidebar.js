import React, { useState } from "react";
import {
  FaFolderOpen,
  FaSearch,
  FaGitAlt,
  FaCommentDots,
  FaBoxes,
} from "react-icons/fa";

const ProjectSidebar = ({ activePanel, togglePanel }) => {
  const icons = [
    { name: "explorer", icon: <FaFolderOpen /> },
    { name: "search", icon: <FaSearch /> },
    { name: "git", icon: <FaGitAlt /> },
    { name: "prompts", icon: <FaCommentDots /> },
    { name: "extensions", icon: <FaBoxes /> },
  ];

  return (
    <div style={styles.sidebar}>
      {icons.map((tab) => (
        <div
          key={tab.name}
          style={styles.tab(activePanel === tab.name)}
          onClick={() => togglePanel(tab.name)}
          title={tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
        >
          <div style={styles.icon}>{tab.icon}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  sidebar: { height: "100%", width: "60px", backgroundColor: "#1e1e1e" },
  tab: (isActive) => ({
    width: "100%",
    padding: "15px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: isActive ? "#007acc" : "transparent",
    borderLeft: isActive ? "4px solid #007acc" : "4px solid transparent",
    transition: "all 0.2s ease-in-out",
  }),
  icon: { color: "#d4d4d4", fontSize: "24px" },
};

export default ProjectSidebar;
