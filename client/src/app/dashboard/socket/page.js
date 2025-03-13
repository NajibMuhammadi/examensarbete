'use client';

import { useEffect, useState} from 'react';
import io from 'socket.io-client';
import {TextField, Button, List, ListItem, ListItemText, Typography, Box, ListItemAvatar, Avatar } from '@mui/material';
import { useSession } from 'next-auth/react';

const SOCKET_URL = 'http://localhost:8088'; 

const SocketApp = () => {
  const { data: session } = useSession(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null); 

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server, ID:', socket.id);
    });

    socket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() && socket && session) {
      const userName = session.user?.name || 'Anonymous';
      const image = session.user?.image || ''; 
  
      console.log("Skickar meddelande:", { text: newMessage, userName, image });
  
      socket.emit('sendMessage', { text: newMessage, userName, image });
      setNewMessage('');
    }
  };
  

  return (
    <Box
      sx={{
        width: '100%',
        height: {
          xs: 'calc(100vh - 80px)',
          sm: 'calc(100vh - 112px)',
      }
      }}
    >
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: 2,
          padding: 2,
          overflowY: 'auto',
          bgcolor: "#fff",
          height:{
            xs: 'calc(100vh - 260px)',
            sm: 'calc(100vh - 300px)',
            md: 'calc(100vh - 200px)',
            lg: 'calc(100vh - 200px)',
            xl: 'calc(100vh - 200px)',
          },
          mb: 2,
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src={msg.image} />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: '#000',
                }}
                primary={msg.text}
                secondary={`Sent by: ${msg.userName} at ${new Date(msg.timestamp).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          borderRadius: 2,
          background: '#fff',
          gap: 2,
        }}
      >
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button sx={{
          height: '100%',
          borderRadius: 2,
          padding: '10px',
          fontSize: '16px',
          textTransform: 'capitalize',
        }}
          variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default SocketApp;
