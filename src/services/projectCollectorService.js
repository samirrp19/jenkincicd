import axios from 'axios';

const fetchUserProjects = async (username, token) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects/${username}/projects`, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch projects');
  }
};

export default fetchUserProjects;
