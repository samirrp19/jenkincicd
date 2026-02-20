import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const OAuthCallbackHandler = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { handleSetToken } = useAuth();

  useEffect(() => {
    const token = params.get('token');
    const id = params.get('id');
    const username = params.get('username');
    const name = params.get('name');
    const email = params.get('email');

    if (token && id && username) {
      const user = { id, username, name, email };
      handleSetToken(token, user);
      navigate(`/${username}/community`, { replace: true });
    } else {
      navigate('/login');
    }
  }, []);

  return null;
};

export default OAuthCallbackHandler;
