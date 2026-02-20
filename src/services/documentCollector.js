import axios from 'axios';

const fetchUserDocuments = async (username, token) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
    const response = await axios.get(`${apiUrl}/api/store/${username}/documents`, {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw new Error('Failed to load documents.');
  }
};

export default fetchUserDocuments;
