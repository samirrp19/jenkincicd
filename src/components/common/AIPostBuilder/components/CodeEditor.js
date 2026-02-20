import React, { useEffect, useState } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import "../styles/CodeEditor.css";

const CodeEditor = ({ activeFile, fileContent, onFileChange }) => {
  const monaco = useMonaco();
  const [isEditorReady, setEditorReady] = useState(false);

  // Ensure Monaco is properly loaded before rendering
  useEffect(() => {
    if (monaco) {
      setEditorReady(true);
    }
  }, [monaco]);

  const getLanguage = (fileName) => {
    if (!fileName) return "plaintext"; // Fallback if no file is active
    const extension = fileName.split(".").pop();
    switch (extension) {
      case "js":
        return "javascript";
      case "html":
        return "html";
      case "css":
        return "css";
      case "json":
        return "json";
      case "py":
        return "python";
      default:
        return "plaintext";
    }
  };

  if (!isEditorReady) {
    return (
      <div style={{ color: "#cccccc", textAlign: "center", paddingTop: "20px" }}>
        Loading editor...
      </div>
    );
  }

  return (
    <div className="code-editor">
      {activeFile ? (
        <Editor
          height="100%"
          width="100%"
          language={getLanguage(activeFile)}
          value={fileContent || ""}
          theme="vs-dark"
          onChange={onFileChange} // Triggered when file content changes
          options={{
            fontSize: 14,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      ) : (
        <p style={{ color: "#cccccc", textAlign: "center", paddingTop: "20px" }}>
          Select a file to edit
        </p>
      )}
    </div>
  );
};

export default CodeEditor;
