import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const AuthUserList = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Fetch users from an API or a data source
    const fetchUsers = async () => {
      // For demonstration, we use a placeholder array
      const userList = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  const handleRegister = () => {
    // Registration logic here
    console.log('Registering user:', username, password);
    // Reset fields
    setUsername('');
    setPassword('');
  };

  const handleLogin = () => {
    // Login logic here
    setToken('dummy-token'); // Placeholder for actual token
  };

  return (
    <div>
      <h1>{showLogin ? 'Login' : 'Register'}</h1>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={showLogin ? handleLogin : handleRegister}> 
        {showLogin ? 'Login' : 'Register'}
      </Button>
      <Button variant="text" onClick={() => setShowLogin(!showLogin)}>
        Switch to {showLogin ? 'Register' : 'Login'}
      </Button>
      <h2>User List</h2>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AuthUserList;