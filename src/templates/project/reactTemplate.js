const reactTemplate = {
    title: 'React Template',
    isDirectory: true,
    children: [
      {
        title: 'public',
        isDirectory: true,
        children: [{ title: 'index.html', isDirectory: false, content: '<!-- HTML content -->' }],
      },
      {
        title: 'src',
        isDirectory: true,
        children: [
          { title: 'App.js', isDirectory: false, content: 'import React from \'react\';\n\nconst App = () => <h1>Hello, World!</h1>;\nexport default App;' },
          { title: 'index.js', isDirectory: false, content: 'import React from \'react\';\nimport ReactDOM from \'react-dom\';\nimport App from \'./App\';\n\nReactDOM.render(<App />, document.getElementById(\'root\'));' },
          { title: 'styles.css', isDirectory: false, content: '/* CSS content */' },
        ],
      },
      { title: 'package.json', isDirectory: false, content: '{\n "name": "react-app",\n "version": "1.0.0",\n "dependencies": {}\n}' },
    ],
  };
  
  export default reactTemplate;
  