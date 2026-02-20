import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const getCodeSuggestions = async (codeContext, questionContext, language) => {
  try {
    const response = await axios.post(`${apiUrl}/api/code/suggest`, {
      codeContext,
      questionContext,
      language,
    });
    return response.data.suggestions;
  } catch (error) {
    console.error('Error fetching code suggestions:', error);
    throw error;
  }
};
