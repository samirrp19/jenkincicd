import React, { useEffect, useState } from 'react';
import IframeResizer from '@iframe-resizer/react';

const Viewer = ({ htmlCode, cssCode, jsCode }) => {
  const [iframeContent, setIframeContent] = useState('');

  useEffect(() => {
    const completeHTML = `
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              height: 100%;
            }
            html {
              height: 100%;
            }
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script type="text/javascript">${jsCode}</script>
        </body>
      </html>
    `;
    console.log('Iframe Content:', completeHTML); 

    setIframeContent(completeHTML);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <IframeResizer
      srcDoc={iframeContent}
      style={{
        width: '100%',
        height: '100%', // Ensure the iframe takes up the entire height of its container
        border: '1px solid #ddd',
        display: 'flex', // Make it a flex item
        flexDirection: 'column', // Align content in a column
        flex: '1 1 auto', // Allow it to grow and shrink to fill the available space
      }}
      sandbox="allow-scripts"
      scrolling="yes"
      licensekey="GPLv3"
    />
  );
};

export default Viewer;
