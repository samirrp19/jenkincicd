import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaEllipsisH } from 'react-icons/fa'; // Importing icons for close and overflow menu
import '../styles/EditorTabs.css';

const EditorTabs = ({ openFiles, activeFile, setActiveFile, closeFile, setOpenFiles, onDropFile }) => {
  const [overflowedFiles, setOverflowedFiles] = useState([]); // Files that overflow
  const [isOverflowMenuOpen, setIsOverflowMenuOpen] = useState(false); // Toggle for overflow menu
  const tabsRef = useRef(null);

  // Track the dragged tab index
  const [draggedTabIndex, setDraggedTabIndex] = useState(null);

  // Check if files overflow the tab container
  const checkOverflow = () => {
    const containerWidth = tabsRef.current?.offsetWidth || 0;
    const tabsWidth = Array.from(tabsRef.current?.children || []).reduce(
      (totalWidth, tab) => totalWidth + tab.offsetWidth,
      0
    );

    // If tabs exceed the container width, show the overflow
    if (tabsWidth > containerWidth) {
      const visibleTabs = [];
      const overflowedTabs = [];
      let currentWidth = 0;

      // Calculate how many tabs can fit
      openFiles.forEach((file, i) => {
        const tabWidth = tabsRef.current?.children[i]?.offsetWidth || 0;
        if (currentWidth + tabWidth < containerWidth - 50) { // Leave space for "..."
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

  // Handle drag start event
  const handleDragStart = (index) => {
    setDraggedTabIndex(index);
  };

  // Handle drop event from another tab
  const handleDrop = (index) => {
    if (draggedTabIndex === null || draggedTabIndex === index) return;

    const reorderedFiles = [...openFiles];
    const draggedFile = reorderedFiles.splice(draggedTabIndex, 1)[0]; // Remove dragged tab
    reorderedFiles.splice(index, 0, draggedFile); // Insert dragged tab in the new position

    setOpenFiles(reorderedFiles); // Update the order of the open files
    setActiveFile(reorderedFiles[index].title); // Ensure the active file updates correctly
    setDraggedTabIndex(null); // Reset the dragged tab index
  };

  // Handle drop from Explorer
  const handleFileDrop = (e) => {
    e.preventDefault();
    const fileData = e.dataTransfer.getData('fileData');
    if (fileData) {
      const file = JSON.parse(fileData); // Parse the dropped file data
      onDropFile(file); // Open the dropped file
    }
  };

  return (
    <div
      className="editor-tabs"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop} // Handle dropping from Explorer
    >
      <div className="tabs" ref={tabsRef}>
        {openFiles.map((file, index) => (
          <div
            key={file.title}
            className={`editor-tab ${file.title === activeFile ? 'active' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            onClick={() => setActiveFile(file.title)}
          >
            {file.title} {/* Render file name here */}
            <FaTimes
              className="close-tab-icon"
              onClick={(e) => {
                e.stopPropagation(); // Prevent tab click when closing
                closeFile(file.title);
              }}
            />
          </div>
        ))}

        {/* Overflow "..." icon if files overflow */}
        {overflowedFiles.length > 0 && (
          <div className="overflow-menu">
            <FaEllipsisH onClick={() => setIsOverflowMenuOpen(!isOverflowMenuOpen)} />
            {isOverflowMenuOpen && (
              <div className="overflow-dropdown">
                {overflowedFiles.map((file) => (
                  <div
                    key={file.title}
                    className="overflow-file"
                    onClick={() => {
                      setActiveFile(file.title);
                      setIsOverflowMenuOpen(false);
                    }}
                  >
                    {file.title}
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
