import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaEllipsisH } from 'react-icons/fa'; 
import '../styles/EditorTabs.css';

const EditorTabs = ({ openFiles, activeFile, setActiveFile, closeFile, setOpenFiles, onDropFile }) => {
  const [overflowedFiles, setOverflowedFiles] = useState([]);
  const [isOverflowMenuOpen, setIsOverflowMenuOpen] = useState(false);
  const tabsRef = useRef(null);
  const [draggedTabIndex, setDraggedTabIndex] = useState(null);

  // Prevent adding duplicate files
  useEffect(() => {
    setOpenFiles((prevFiles) => {
      return prevFiles.filter(
        (file, index, self) => index === self.findIndex((f) => f.fileName === file.fileName)
      );
    });
  }, [openFiles]);

  // Check if files overflow the tab container
  const checkOverflow = () => {
    const containerWidth = tabsRef.current?.offsetWidth || 0;
    const tabsWidth = Array.from(tabsRef.current?.children || []).reduce(
      (totalWidth, tab) => totalWidth + tab.offsetWidth,
      0
    );

    if (tabsWidth > containerWidth) {
      const visibleTabs = [];
      const overflowedTabs = [];
      let currentWidth = 0;

      openFiles.forEach((file, i) => {
        const tabWidth = tabsRef.current?.children[i]?.offsetWidth || 0;
        if (currentWidth + tabWidth < containerWidth - 50) { 
          visibleTabs.push(file);
          currentWidth += tabWidth;
        } else {
          overflowedTabs.push(file);
        }
      });
      setOverflowedFiles(overflowedTabs);
    } else {
      setOverflowedFiles([]);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [openFiles]);

  const handleDragStart = (index) => setDraggedTabIndex(index);

  const handleDrop = (index) => {
    if (draggedTabIndex === null || draggedTabIndex === index) return;

    const reorderedFiles = [...openFiles];
    const draggedFile = reorderedFiles.splice(draggedTabIndex, 1)[0];
    reorderedFiles.splice(index, 0, draggedFile);

    setOpenFiles(reorderedFiles);
    setActiveFile(reorderedFiles[index].fileName);
    setDraggedTabIndex(null);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const fileData = e.dataTransfer.getData('fileData');
    if (fileData) {
      const file = JSON.parse(fileData);
      onDropFile(file);
    }
  };

  return (
    <div
      className="editor-tabs"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
    >
      <div className="tabs" ref={tabsRef}>
        {openFiles.map((file, index) => (
          <div
            key={file.fileName} // Ensure unique key
            className={`editor-tab ${file.fileName === activeFile ? 'active' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            onClick={() => setActiveFile(file.fileName)}
          >
            {file.fileName} 
            <FaTimes
              className="close-tab-icon"
              onClick={(e) => {
                e.stopPropagation();
                closeFile(file.fileName);
              }}
            />
          </div>
        ))}

        {overflowedFiles.length > 0 && (
          <div className="overflow-menu">
            <FaEllipsisH onClick={() => setIsOverflowMenuOpen(!isOverflowMenuOpen)} />
            {isOverflowMenuOpen && (
              <div className="overflow-dropdown">
                {overflowedFiles.map((file) => (
                  <div
                    key={file.fileName}
                    className="overflow-file"
                    onClick={() => {
                      setActiveFile(file.fileName);
                      setIsOverflowMenuOpen(false);
                    }}
                  >
                    {file.fileName}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorTabs;
