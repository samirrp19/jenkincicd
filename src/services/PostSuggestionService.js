import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const getContentSuggestions = async (username, token, question) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/posts/${username}/posts/ai`, 
      { question },  // User's input (the question or context for content generation)
      {
        headers: {
          'x-auth-token': token, // The token should be passed in the headers
        }
      }
    );
    return response.data.response; // Assuming the API returns the response object containing the content
  } catch (error) {
    console.error('Error fetching content suggestions:', error);
    throw error;
  }
};
