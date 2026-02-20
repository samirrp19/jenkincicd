import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ children, token }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
}

export default PrivateRoute;
