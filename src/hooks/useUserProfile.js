import { useEffect } from 'react';
import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL

function useUserProfile(token, user, setToken, setUser) {
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token && user?.username) {
        try {
          const response = await axios.get(`${api_url}/api/users/${user.username}/profile`, {
            headers: {
              'x-auth-token': token,
            },
          });
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setToken('');
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user?.username]);
}

export default useUserProfile;
