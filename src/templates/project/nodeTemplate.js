const nodeTemplate = {
    title: 'Node.js Template',
    isDirectory: true,
    children: [
      {
        title: 'src',
        isDirectory: true,
        children: [
          { title: 'index.js', isDirectory: false, content: 'console.log("Hello, Node.js!");' },
        ],
      },
      { title: 'package.json', isDirectory: false, content: '{\n "name": "node-app",\n "version": "1.0.0",\n "main": "index.js"\n}' },
    ],
  };
  
  export default nodeTemplate;
  