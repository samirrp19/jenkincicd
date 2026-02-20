import React from "react";

const AppViewer = ({ open, toggleAppViewer, compiledAppUrl }) => {
  return (
    <div style={{ ...styles.drawer, transform: open ? "translateX(0)" : "translateX(100%)" }}>
      <div style={styles.header}>
        <button style={styles.closeButton} onClick={toggleAppViewer}>
          Close
        </button>
      </div>
      <iframe
        src={compiledAppUrl}
        style={styles.iframe}
        title="Compiled App Viewer"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

const styles = {
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: "50%", // Adjust width as needed
    backgroundColor: "#1e1e1e",
    borderLeft: "1px solid #ccc",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease-in-out", // Smooth slide effect
  },
  header: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    textAlign: "right",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  iframe: {
    flex: 1,
    border: "none",
    width: "100%",
    backgroundColor: "#ffffff", // Ensure iframe has a white background
  },
};

export default AppViewer;
