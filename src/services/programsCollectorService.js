import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * Fetches all posts for a specific user.
 * 
 * @param {string} username - The username for which to fetch posts.
 * @param {string} token - The authentication token for the user.
 * @returns {Promise<Object>} - A promise that resolves to the user's posts or an error message.
 */
const fetchUserPrograms = async (username, token) => {
  try {
    const response = await axios.get(`${apiUrl}/api/store/programs/${username}/programs`, {
      headers: {
        'x-auth-token': token,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Unable to fetch posts. Please try again later.');
  }
};

export default fetchUserPrograms;
