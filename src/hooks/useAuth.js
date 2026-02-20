import { useState, useEffect } from 'react';

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  const handleSetToken = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  
    // Store data in localStorage
    setTimeout(() => {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
  
      // Redirect after successful login
      window.location.href = `/${newUser.username}/community`;
    }, 0);
  };  

  useEffect(() => {
    if (token && !localStorage.getItem('token')) {
      localStorage.setItem('token', token);
    }
    if (user && !localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [token, user]);

  return { token, user, handleSetToken };
}

export default useAuth;
