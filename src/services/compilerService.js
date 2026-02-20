import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const executeCode = async (code, language) => {
  try {
    const response = await axios.post(`${apiUrl}/api/execute`, {
      code,
      language
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || error.message || 'Code execution failed'
    );
  }
};

const compilerService = {
  executeCode,
};

export default compilerService;
