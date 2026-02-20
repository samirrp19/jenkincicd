import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/';

const getQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/questions`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const getQuestionById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/questions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const questionService = {
  getQuestions,
  getQuestionById,
};

export default questionService;
