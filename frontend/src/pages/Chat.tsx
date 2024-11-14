import { Box, Avatar, TextField, InputAdornment, IconButton, Typography, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { red } from '@mui/material/colors';
import { UserAuth } from '../contex/AuthContext'; // Ensure correct spelling of 'context'
import ChatMessage from '../components/shared/ChatMessage';
import { sendChatRequest, fetchChatHistory } from '../helpers/api-communication';
import { useEffect, useState } from 'react';

type Message = { role: string; content: string; timestamp: string };
const Chat = () => {
  const auth = UserAuth();
  const userAvatar = `${auth?.user?.name[0]}${auth?.user?.name.split(' ')[1]?.[0] || ''}`;

  // Fetch previous chat history on component mount
  useEffect(() => {
    const getChatHistory = async () => {
      try {
        const previousChats = await fetchChatHistory(); // Assume this fetches chats from the backend
        setChatMessage(previousChats);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    getChatHistory();
  }, []);

  const [message, setMessage] = useState('');
  const [chatMessage, setChatMessage] = useState<Message[]>([]);
  const handleButtonClick = async () => {
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    // Optimistically show user's message
    setChatMessage((prev) => [...prev, userMessage]);
    setMessage('');

    try {
      const chatData = await sendChatRequest(userMessage.content);
      const botResponse = chatData.chats; // Only append bot response

      setChatMessage([...botResponse]);
    } catch (error) {
      console.error('Failed to fetch bot response:', error);
    }
  };




  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: 'flex', sm: 'none', xs: 'none' },
          flex: 0.2,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'rgb(17, 29, 39)',
            borderRadius: 5,
            mx: 3,
            p: 2,
            height: 'auto',
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'rgb(17, 29, 39)',
              fontWeight: 700,
            }}
          >
            {userAvatar}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'Work Sans', textAlign: 'center' }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: 'Work Sans', my: 4, p: 1, textAlign: 'center' }}>
            Feel free to ask questions but avoid sharing personal information.
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: '80%',
              mx: 'auto',
              color: 'white',
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* Chat Section */}
      <Box
        sx={{
          display: 'flex',
          flex: 0.8,
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '40px',
            color: 'white',
            mb: 2,
            fontWeight: 'bold',
          }}
        >
          Model - Gemini 1.5 Flash
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            p: 2,
            bgcolor: 'rgb(30, 30, 30)',
          }}
        >
          {chatMessage.map((data, index) => (
// @ts-ignore
            <ChatMessage key={index} role={data.role} content={data.content} userAvatar={userAvatar} />
          ))}
        </Box>
        <Box
          sx={{
            width: '95%',
            height: '10vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'white',
            px: 2,
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Updates the message state
            InputProps={{
              style: { color: 'black', fontSize: 18 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleButtonClick}>
                    <ArrowRightAltIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
