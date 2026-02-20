import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import io from 'socket.io-client';
import axios from 'axios';
import useAuth from 'hooks/useAuth';

const TerminalComponent = () => {
  const { token, user } = useAuth();
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(new FitAddon());
  const socketRef = useRef(null);
  const [containerId, setContainerId] = useState(null); // Store container ID in state
  const username = user?.username;

  useEffect(() => {
    if (!username) {
      console.error('Username is undefined');
      return;
    }

    const fetchContainerId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/container', {
          params: { clusterName: 'codex-ecs-cluster', serviceName: 'codex-terminal-service' },
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        });

        if (response.data && response.data.taskArn) {
          // You might need to set publicIp instead of privateIp
          setContainerId(response.data.publicIp || response.data.privateIp); 
        } else {
          console.error('Invalid container details received:', response.data);
          if (term.current) {
            term.current.write(`\r\nError: Invalid container details received.\r\n`);
          }
        }
      } catch (error) {
        console.error('Error fetching container ID:', error);
        if (term.current) {
          term.current.write(`\r\nError: Error fetching container details.\r\n`);
        }
      }
    };

    fetchContainerId(); // Fetch container ID on component mount
  }, [token, username]);

  useEffect(() => {
    if (!containerId || !username) {
      return;
    }

    // Initialize terminal only when the containerId is available
    term.current = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
      },
    });

    // Attach the terminal to the DOM element
    term.current.loadAddon(fitAddon.current);
    term.current.open(terminalRef.current);
    fitAddon.current.fit();

    term.current.write(`Welcome ${username} to the Web Terminal!\r\n$ `);

    // Handle terminal input
    term.current.onData((input) => {
      if (socketRef.current) {
        socketRef.current.emit('terminalInput', input);
      }
    });

    // Establish WebSocket connection
    socketRef.current = io('http://localhost:3000/terminal');

    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket');
      socketRef.current.emit('startTerminal', { containerId });
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
    });

    socketRef.current.on('terminalOutput', (data) => {
      term.current.write(data);
    });

    socketRef.current.on('terminalError', (error) => {
      term.current.write(`\r\nError: ${error}\r\n`);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
    });

    return () => {
      term.current.dispose();
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [containerId, username]); // Ensure this effect runs when `containerId` and `username` are set

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1e1e1e',
        padding: '10px',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        ref={terminalRef}
        style={{
          flexGrow: 1,
          backgroundColor: '#1e1e1e',
          width: '100%',
        }}
      />
    </div>
  );
};

export default TerminalComponent;
