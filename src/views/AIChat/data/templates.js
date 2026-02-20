const templates = [
  { 
    name: "Create from scratch", 
    icon: "📄", 
    color: "linear-gradient(to right, #8ec5fc, #e0c3fc)", 
    textColor: "#fff", 
    type: "custom", 
    postType: "template",
    context: "General",
    generatorType: "generateFrontendApp"
  },
  { 
    name: "Create with AI", 
    icon: "🤖", 
    color: "linear-gradient(to right, #ff9966, #ff5e62)", 
    textColor: "#fff",
    type: "ai",
    postType: "app",
    context: "AI",
    generatorType: "generateNodeApp"
  },
  { 
    name: "Backend Development", 
    icon: "🖥️", 
    color: "#fff", 
    textColor: "#000", 
    type: "backend", 
    postType: "app",
    context: "Backend Service", 
    defaultFramework: "Node.js", 
    defaultDb: "mongodb", 
    generatorType: "generateNodeApp",
    frameworks: [
      { name: "Node.js", icon: "🟩", value: "node" }, 
      { name: "Python", icon: "🐍", value: "python" }, 
      { name: "Java", icon: "☕", value: "java" },
      { name: "Ruby", icon: "💎", value: "ruby" }, 
      { name: "C# (.NET)", icon: "🔵", value: "csharp" }, 
      { name: "Go (Golang)", icon: "🐹", value: "golang" },
      { name: "PHP", icon: "🐘", value: "php" }, 
      { name: "TypeScript (Deno)", icon: "🦕", value: "typescript" }
    ]
  },
  { 
    name: "Frontend Development", 
    icon: "🎨", 
    color: "#fff", 
    textColor: "#000", 
    type: "frontend", 
    postType: "template",
    context: "Frontend Service", 
    defaultFramework: "React",
    defaultDb: "mongodb",
    generatorType: "generateFrontendApp",
    frameworks: [
      { name: "React", icon: "⚛️", value: "reacttemplate" }, 
      { name: "Vue.js", icon: "🟢", value: "vue" }, 
      { name: "Angular", icon: "🅰️", value: "angular" }, 
      { name: "Svelte", icon: "🔥", value: "svelte" }
    ]
  },
  { 
    name: "Tech Architecture", 
    icon: "🏗️", 
    color: "#fff", 
    textColor: "#000", 
    type: "architecture", 
    postType: "program",
    context: "Microservices",
    generatorType: "generateMicroservicesApp",
    frameworks: [
      { name: "Microservices", icon: "🔗", value: "microservices" }, 
      { name: "Monolithic", icon: "🏛️", value: "monolithic" }, 
      { name: "Serverless", icon: "☁️", value: "serverless" }
    ]
  },
  { 
    name: "Mobile App Development", 
    icon: "📱", 
    color: "#fff", 
    textColor: "#000", 
    type: "mobile", 
    postType: "app",
    context: "Mobile App", 
    defaultFramework: "React Native",
    generatorType: "generateReactNativeApp",
    frameworks: [
      { name: "React Native", icon: "⚛️", value: "react-native" }, 
      { name: "Flutter", icon: "💙", value: "flutter" }, 
      // { name: "Swift", icon: "🟠", value: "swift" }, 
      // { name: "Kotlin", icon: "🟣", value: "kotlin" }
    ]
  },
  { 
    name: "Data Science", 
    icon: "📊", 
    color: "#fff", 
    textColor: "#000", 
    type: "data-science", 
    postType: "program",
    context: "Machine Learning", 
    defaultFramework: "Jupyter",
    generatorType: "generateDataScienceApp",
    frameworks: [
      { name: "Jupyter", icon: "📓", value: "jupyter" }, 
      { name: "TensorFlow", icon: "🧠", value: "tensorflow" }, 
      { name: "PyTorch", icon: "🔥", value: "pytorch" }, 
      { name: "Scikit-Learn", icon: "📈", value: "scikit-learn" }
    ]
  },
  { 
    name: "Testing", 
    icon: "🧪", 
    color: "#fff", 
    textColor: "#000", 
    type: "testing", 
    postType: "program",
    context: "Unit Testing", 
    generatorType: "generateTestingApp",
    frameworks: [
      { name: "Jest", icon: "🃏", value: "jest" }, 
      { name: "Cypress", icon: "🌲", value: "cypress" }, 
      { name: "Mocha", icon: "☕", value: "mocha" }, 
      { name: "Selenium", icon: "🦗", value: "selenium" }
    ]
  },
  { 
    name: "DevOps", 
    icon: "🔄", 
    color: "#fff", 
    textColor: "#000", 
    type: "devops", 
    postType: "program",
    context: "Infrastructure",
    generatorType: "generateDevOpsApp",
    frameworks: [
      { name: "Docker", icon: "🐳", value: "docker" }, 
      { name: "Kubernetes", icon: "☸️", value: "kubernetes" }, 
      { name: "Terraform", icon: "🏗️", value: "terraform" }, 
      { name: "Jenkins", icon: "🤖", value: "jenkins" }
    ]
  },
  { 
    name: "Game Development", 
    icon: "🎮", 
    color: "#fff", 
    textColor: "#000", 
    type: "game", 
    postType: "game",
    context: "Game Development",
    generatorType: "generateGameApp",
    frameworks: [
      // { name: "Unity", icon: "🎭", value: "unity" }, 
      // { name: "Unreal Engine", icon: "🎬", value: "unreal" }, 
      { name: "Godot", icon: "🎨", value: "godot" }, 
      { name: "Phaser", icon: "⚡", value: "phaser" }
    ]
  }
];

export default templates;
