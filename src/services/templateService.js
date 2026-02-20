import axios from 'axios';

// Function to save a template to the server
export const saveTemplate = async (templateName, htmlContent, cssContent, jsContent, token, username) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const response = await axios.post(`${apiUrl}/api/store/templates/${username}/templates/new`, {
    templateName,
    htmlContent,    // Send HTML content separately
    cssContent,     // Send CSS content separately
    jsContent, 
  }, {
    headers: {
      'x-auth-token': token,  // Pass the auth token in headers
    }
  });

  return response.data;
};

// Function to fetch all templates for a specific user
export const fetchUserTemplates = async (username, token) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const response = await axios.get(`${apiUrl}/api/store/templates/${username}/templates`, {
    headers: {
      'x-auth-token': token,  // Pass the auth token in headers
    }
  });

  return response.data;  // Return the list of templates
};

// Function to fetch the content (HTML, CSS, JS) of a specific template
export const fetchTemplateContent = async (templateId, username, token) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const response = await axios.get(`${apiUrl}/api/store/templates/${username}/templates/${templateId}`, {
    headers: {
      'x-auth-token': token,  // Pass the auth token in headers
    }
  });

  return response.data;  // Return the template content (HTML, CSS, JS)
};
