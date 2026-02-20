import { useState, useEffect } from 'react';
import { supportedLanguages } from '../utils/languageOptions';
import useLanguageSocket from './useLanguageSocket';

export default function useLanguageLogic({ initialCode = '', initialLanguage = 'bash', user, token }) {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode);
  const [currentFile, setCurrentFile] = useState(`main.${getExtension(initialLanguage)}`);
  const [files, setFiles] = useState([{ name: `main.${getExtension(initialLanguage)}`, content: initialCode }]);
  const [output, setOutput] = useState({ stdout: '', stderr: '', error: '' }); // ✅ Add this
  const [standardInput, setStandardInput] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [programTitle, setProgramTitle] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [visibility, setVisibility] = useState('private');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState('');

  const { emitProgramPrompt } = useLanguageSocket({
    token,
    userId: user?.id,
    setCode,
    setLoading
  });

  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode]);

  function getExtension(lang) {
    return supportedLanguages.find(l => l.value === lang)?.extension || 'txt';
  }

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    const ext = getExtension(lang);
    const fileName = `main.${ext}`;
    setSelectedLanguage(lang);
    setCurrentFile(fileName);
    setFiles([{ name: fileName, content: '' }]);
    setCode('');
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const newFile = { name: file.name, content: event.target.result };
      setFiles([...files, newFile]);
      setCurrentFile(file.name);
      setCode(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleSaveProgram = async () => {
    try {
      await fetch(`/api/save`, {
        method: 'POST',
        body: JSON.stringify({ code, language: selectedLanguage }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    token,
    selectedLanguage,
    setSelectedLanguage,
    handleLanguageChange,
    currentFile,
    setCurrentFile,
    code,
    setCode,
    files,
    setFiles,
    output,
    setOutput,               // ✅ Return it here
    standardInput,
    setStandardInput,
    aiPrompt,
    setAiPrompt,
    programTitle,
    setProgramTitle,
    programDescription,
    setProgramDescription,
    tags,
    setTags,
    visibility,
    setVisibility,
    isSidebarOpen,
    setIsSidebarOpen,
    sidebarContent,
    setSidebarContent,
    loading,
    setLoading,
    handleFileUpload,
    handleSaveProgram,
  };
}
