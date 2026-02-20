import axios from "axios"


const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/';

const getProblems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/questions`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  };

export { getProblems }