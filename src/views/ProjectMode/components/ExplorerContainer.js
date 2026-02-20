import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import { FaFolder, FaFileCode, FaJsSquare, FaHtml5, FaCss3Alt, FaChevronRight, FaChevronDown } from 'react-icons/fa'; 
import EditorTabs from './EditorTabs';
import CodeEditor from './CodeEditor';
import TerminalTabs from './TerminalTabs'; // Importing the updated TerminalTabs
import '../styles/ExplorerContainer.css'; // Updated styles

const ExplorerContainer = ({ username, template }) => {
  const [files, setFiles] = useState([]);
  const [collapsedFolders, setCollapsedFolders] = useState({});
  const [openFiles, setOpenFiles] = useState([]); // Track open files with their content
  const [activeFile, setActiveFile] = useState(null); // Track the currently active file

  // Load the selected template structure when it changes
  useEffect(() => {
    if (template && template.children) {
      setFiles(template.children); // Load the template file structure
    } else {
      console.error('Invalid template structure.');
    }
  }, [template]);

  const handleFileClick = (file) => {
    openFile(file);
  };

  const openFile = (file) => {
    if (!file.isDirectory) {
      const isFileOpen = openFiles.some((f) => f.title === file.title);
      if (!isFileOpen) {
        setOpenFiles([...openFiles, { title: file.title, content: file.content }]);
      }
      setActiveFile(file.title);
    }
  };

  const closeFile = (fileTitle) => {
    const remainingFiles = openFiles.filter((file) => file.title !== fileTitle);
    setOpenFiles(remainingFiles);
    if (remainingFiles.length > 0) {
      setActiveFile(remainingFiles[0].title);
    } else {
      setActiveFile(null);
    }
  };

  const handleFileChange = (newContent) => {
    setOpenFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.title === activeFile ? { ...file, content: newContent } : file
      )
    );
  };

  const toggleFolder = (folder) => {
    setCollapsedFolders((prevState) => ({
      ...prevState,
      [folder]: !prevState[folder],
    }));
  };

  const handleDragStart = (e, file) => {
    e.dataTransfer.setData('fileData', JSON.stringify(file));
  };

  const renderFileIcon = (file) => {
    if (file.title.endsWith('.js')) return <FaJsSquare />;
    if (file.title.endsWith('.html')) return <FaHtml5 />;
    if (file.title.endsWith('.css')) return <FaCss3Alt />;
    return <FaFileCode />;
  };

  const renderFolderIcon = (isCollapsed) => {
    return isCollapsed ? <FaChevronRight /> : <FaChevronDown />;
  };

  const renderFiles = (fileList, parent = '') => {
    return fileList.map((file) => {
      const filePath = `${parent}/${file.title}`;
      const isCollapsed = collapsedFolders[filePath];
      return (
        <div key={filePath}>
          {file.isDirectory ? (
            <div className="folder-item" onClick={() => toggleFolder(filePath)}>
              {renderFolderIcon(isCollapsed)} <FaFolder className="folder-icon" /> {file.title}
            </div>
          ) : (
            <div
              className="file-item"
              draggable
              onDragStart={(e) => handleDragStart(e, file)}
              onClick={() => handleFileClick(file)}
            >
              {renderFileIcon(file)} {file.title}
            </div>
          )}
          {!isCollapsed && file.isDirectory && (
            <div className="folder-children">{renderFiles(file.children, filePath)}</div>
          )}
        </div>
      );
    });
  };

  const activeFileContent = openFiles.find((file) => file.title === activeFile)?.content || '';

  return (
    <div className="explorer-container-wrapper">
      <SplitPane split="vertical" minSize={200} defaultSize={300} resizerClassName="resizer">
        <div className="explorer-container">
          <div className="explorer-header">EXPLORER</div>
          <div className="explorer-body">{renderFiles(files)}</div>
        </div>

        <SplitPane split="horizontal" defaultSize="75%" minSize={300} resizerClassName="horizontal-resizer">
          <div className="editor-container">
            {openFiles.length > 0 ? (
              <>
                <EditorTabs
                  openFiles={openFiles}
                  activeFile={activeFile}
                  setActiveFile={setActiveFile}
                  closeFile={closeFile}
                  setOpenFiles={setOpenFiles}
                  onDropFile={openFile}
                />
                <CodeEditor
                  activeFile={activeFile}
                  fileContent={activeFileContent}
                  handleFileChange={handleFileChange}
                />
              </>
            ) : (
              <p style={{ color: '#cccccc', textAlign: 'center', paddingTop: '20px' }}>Select a file to edit</p>
            )}
          </div>
          {/* Updated Terminal Tab container */}
          <div className="terminal-tabs-container">
            <TerminalTabs username={username} />
          </div>
        </SplitPane>
      </SplitPane>
    </div>
  );
};

export default ExplorerContainer;
