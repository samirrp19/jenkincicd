import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { token, user } = useAuth();
    const { username: paramUsername } = useParams(); 

    const username = user?.username || paramUsername;

    // Ensure token and username are available before rendering the component
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    if (!username) {
      return <Navigate to="/" replace />;
    }

    // Pass the token and user props down to the wrapped component
    return <WrappedComponent {...props} username={username} token={token} user={user} />;
  };
};

export default withAuth;
