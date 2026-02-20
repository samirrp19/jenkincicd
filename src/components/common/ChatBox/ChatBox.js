import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography, Avatar, TextField, List, ListItem, ListItemText, ListItemAvatar, Tabs, Tab, IconButton, InputAdornment, Badge } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import MinimizeIcon from '@mui/icons-material/Minimize';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles'; // Import useTheme for theme-based styles

const apiUrl = process.env.REACT_APP_API_URL;
const wsUrl = process.env.REACT_APP_WS_CHAT_URL;

const ChatBox = ({ token, username }) => {
  const [minimizedMain, setMinimizedMain] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [openChats, setOpenChats] = useState([]);
  const [chatStates, setChatStates] = useState({});
  const [chatInput, setChatInput] = useState({});
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [unreadMessages, setUnreadMessages] = useState({});
  const [isSending, setIsSending] = useState(false);
  const socketRef = useRef(null);
  const chatInputRef = useRef({}); // Keeps track of input fields per chat

  const theme = useTheme(); 

  // ✅ Fetch friends list when the component mounts
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/${username}/friends`, {
          headers: { 'x-auth-token': token },
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [username, token]);

// ✅ Establish WebSocket connection on mount & cleanup on unmount
useEffect(() => {
  if (!username || !token) return;

  if (socketRef.current) {
    console.log("❌ WebSocket already initialized, skipping reinitialization.");
    return; // Prevent duplicate connections
  }

  console.log("🛠 Initializing WebSocket...");
  socketRef.current = io(`${wsUrl}/private`, {
    path: "/socket.io/",
    transports: ['websocket'],
    auth: { token },
  });

  socketRef.current.on('connect', () => {
    console.log(`✅ WebSocket Connected ChatBox: ${socketRef.current.id}`);
  });

  // Remove previous listeners to prevent duplicates
  socketRef.current.off('previousMessages'); 
  socketRef.current.on('previousMessages', (messages) => {
    console.log("📜 Loading previous messages:", messages);
    setChatMessages((prev) => {
      const updatedMessages = { ...prev };
      messages.forEach(msg => {
        const chatKey = msg.senderUsername === username ? msg.receiverUsername : msg.senderUsername;
        if (!updatedMessages[chatKey]) updatedMessages[chatKey] = [];
        updatedMessages[chatKey].push(msg);
      });
      return updatedMessages;
    });
  });

  socketRef.current.off('newPrivateMessage'); 
  socketRef.current.on('newPrivateMessage', (message) => {
    console.log(`📩 [WEBSOCKET] Received message:`, message);
  
    setChatMessages((prevMessages) => {
      const chatKey = message.senderUsername === username ? message.receiverUsername : message.senderUsername;
      const existingMessages = prevMessages[chatKey] || [];
  
      // ✅ Check if message already exists before adding
      const isDuplicate = existingMessages.some(
        (msg) => msg.messageId === message.messageId
      );
  
      if (!isDuplicate) {
        console.log("📝 Adding received message to state");
        return {
          ...prevMessages,
          [chatKey]: [...existingMessages, message],
        };
      }
  
      console.log("🚫 Duplicate message detected, skipping update.");
      return prevMessages;
    });
  });
    

  return () => {
    console.log("🔌 Disconnecting WebSocket...");
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };
}, [username, token]);


  // ✅ Fetch groups list when the component mounts
  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/groups/${username}/`, {
          headers: { 'x-auth-token': token },
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchUserGroups();
  }, [username, token]);

  const handleToggleMinimizeMain = () => {
    setMinimizedMain(!minimizedMain);
  };

  // ✅ Auto-scroll latest messages
  useEffect(() => {
    openChats.forEach(chat => {
      const chatWindow = document.getElementById(`chat-${chat}`);
      if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  }, [chatMessages]);

  const handleToggleMinimizeChat = (chat) => {
    setChatStates((prevState) => ({
      ...prevState,
      [chat]: !prevState[chat],
    }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenChat = (friendUsername) => {
    setOpenChats((prevChats) => {
      if (prevChats.includes(friendUsername)) return prevChats;
      if (prevChats.length >= 2) return [prevChats[1], friendUsername];
      return [...prevChats, friendUsername];
    });
  
    setChatStates((prevState) => ({ ...prevState, [friendUsername]: false }));
  
    setChatInput((prev) => ({
      ...prev,
      [friendUsername]: prev[friendUsername] || '', // Ensure chat input is initialized
    }));
  
    setUnreadMessages((prev) => ({ ...prev, [friendUsername]: 0 }));
  
    socketRef.current.emit('markAsRead', {
      senderUsername: friendUsername,
      receiverUsername: username,
    });
  };  

  const handleCloseChat = (chat) => {
    setOpenChats((prevChats) => prevChats.filter((openChat) => openChat !== chat));
  };


  const handleSendMessage = (receiverUsername) => {
    if (isSending) {
      console.log("🚫 Preventing duplicate message send.");
      return;
    }
  
    setIsSending(true);
    console.log(`🛠 Preparing to send message to: ${receiverUsername}`);
  
    const messageText = chatInput[receiverUsername]?.trim();
    if (!messageText || !socketRef.current?.connected) {
      console.error("❌ Cannot send message. WebSocket not connected.");
      setIsSending(false);
      return;
    }
  
    const messageData = {
      messageId: uuidv4(),
      text: messageText,
      senderUsername: username,
      receiverUsername,
      timestamp: new Date().toISOString(),
      pending: true, // ✅ Add a pending flag to track unconfirmed messages
    };
  
    console.log("📩 Emitting message:", messageData);
    socketRef.current.emit('sendPrivateMessage', messageData);
  
    // ✅ Add message optimistically but only if it’s not already there
    setChatMessages((prevMessages) => {
      const existingMessages = prevMessages[receiverUsername] || [];
      const isDuplicate = existingMessages.some(
        (msg) => msg.messageId === messageData.messageId
      );
    
      if (!isDuplicate) {
        return {
          ...prevMessages,
          [receiverUsername]: [...existingMessages, messageData],
        };
      }
    
      return prevMessages;
    });

  
    setChatInput((prev) => ({ ...prev, [receiverUsername]: '' }));
  
    if (chatInputRef.current[receiverUsername]) {
      chatInputRef.current[receiverUsername].focus();
    }
  
    setTimeout(() => setIsSending(false), 1000);
  };

  const handleEditClick = () => {
    console.log('Edit button clicked');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
      >
      {/* Main Chatbox */}
      <Box
        sx={{
          width: '300px',
          height: minimizedMain ? '50px' : '400px',
          boxShadow: 3,
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
          transition: 'height 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Clickable Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 1,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderTopLeftRadius: 1,
            borderTopRightRadius: 1,
            cursor: 'pointer',
          }}
          onClick={handleToggleMinimizeMain}
        >
          <Box display="flex" alignItems="center">
            <Avatar alt="User" src="https://via.placeholder.com/50" />
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Messaging
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleToggleMinimizeMain} sx={{ color: theme.palette.primary.contrastText }}>
              {minimizedMain ? <ExpandMoreIcon /> : <MinimizeIcon />}
            </IconButton>
            <IconButton sx={{ color: theme.palette.primary.contrastText }} onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton sx={{ color: theme.palette.primary.contrastText }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
  
        {/* Main Chatbox Content */}
        {!minimizedMain && (
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Tabs */}
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: theme.palette.background.paper,
                zIndex: 1,
                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Friends" />
                <Tab label="Groups" />
              </Tabs>
  
              {/* Search */}
              <Box sx={{ padding: '8px', borderBottom: `1px solid ${theme.palette.divider}` }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search messages"
                  fullWidth
                />
              </Box>
            </Box>
  
            {/* Friends/Groups List */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '8px' }}>
              <List>
                {(tabValue === 0 ? friends : groups).map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    alignItems="flex-start"
                    onClick={() => handleOpenChat(item.username || item.groupName)}
                  >
                    <ListItemAvatar>
                      <Avatar alt={item.name || item.groupName} src="https://via.placeholder.com/50" />
                    </ListItemAvatar>
  
                    <ListItemText
                      primary={item.name || item.groupName}
                      secondary={item.username || item.description}
                    />
  
                    {tabValue === 0 && unreadMessages[item.username] > 0 && (
                      <Badge badgeContent={unreadMessages[item.username]} color="error" />
                    )}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Box>
  
      {/* Render open chatboxes */}
      {openChats.map((chat, index) => (
        <Box
          key={chat}
          sx={{
            width: '300px',
            height: '400px',
            position: 'fixed',
            bottom: 0,
            right: `${340 + index * 320}px`,
            boxShadow: 3,
            borderRadius: 1,
            backgroundColor: theme.palette.background.paper,
            transition: 'height 0.3s ease',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Chatbox Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 1,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              cursor: 'pointer',
            }}
            onClick={() => handleToggleMinimizeChat(chat)}
          >
            <Box display="flex" alignItems="center">
              <Avatar alt={chat} src="https://via.placeholder.com/50" />
              <Typography variant="subtitle1" sx={{ ml: 1 }}>{chat}</Typography>
            </Box>
            <Box>
              <IconButton sx={{ color: theme.palette.primary.contrastText }} onClick={() => handleCloseChat(chat)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
  
          {/* Chat Messages */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
             <Box id={`chat-${chat}`} sx={{ flexGrow: 1, overflowY: 'auto', padding: '8px' }}>
                <Typography variant="body2" fontWeight="bold" mb={1}>Chat with {chat}</Typography>
  
                {chatMessages[chat]?.length > 0 ? (
                  chatMessages[chat].map((msg, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        justifyContent: msg.senderUsername === username ? 'flex-end' : 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: msg.senderUsername === username ? theme.palette.primary.light : theme.palette.grey[300],
                          padding: '8px 12px',
                          borderRadius: '12px',
                          maxWidth: '70%',
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold">{msg.senderUsername}</Typography>
                        <Typography variant="body2">{msg.text}</Typography>
                        <Typography variant="caption" sx={{ fontSize: '10px', opacity: 0.7 }}>
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                    No messages yet
                  </Typography>
                )}
              </Box>
                {/* Chat Input */}
                <Box
                 sx={{
                   display: 'flex',
                   alignItems: 'center',
                   padding: '8px',
                   borderTop: `1px solid ${theme.palette.divider}`,
                   backgroundColor: theme.palette.background.paper, // Ensure visibility
                 }}
               >
                 <TextField
                   value={chatInput[chat] || ''}
                   onChange={(e) =>
                     setChatInput((prev) => ({ ...prev, [chat]: e.target.value }))
                   }
                   fullWidth
                   variant="outlined"
                   placeholder="Type a message..."
                   InputProps={{
                     endAdornment: (
                       <InputAdornment position="end">
                         <IconButton
                           onClick={() => handleSendMessage(chat)}
                           disabled={!chatInput[chat]?.trim()} // Prevent empty messages
                         >
                           <SendIcon />
                         </IconButton>
                       </InputAdornment>
                     ),
                   }}
                 />
               </Box>
            </Box>
        </Box>
      ))}
    </Box>
  );  
};

export default ChatBox;
