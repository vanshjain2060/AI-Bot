import { Box, Typography, Avatar } from '@mui/material';
import { red } from '@mui/material/colors';

const ChatMessage = ({
    role,
    content,
    userAvatar,
}: {
    role: string;
    content: string;
    userAvatar: string;
}) => {
    const isUser = role === 'user';

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isUser ? 'row-reverse' : 'row',
                alignItems: 'center',
                margin: '8px 0',
                width: '100%',
            }}
        >
            <Avatar
                sx={{
                    bgcolor: 'white',
                    color: 'rgb(17, 29, 39)',
                    fontWeight: 700,
                    margin: isUser ? '0 0 0 8px' : '0 8px 0 0',
                }}
            >
                {isUser ? userAvatar : 'B'}
            </Avatar>

            <Typography
                sx={{
                    backgroundColor: isUser ? 'rgba(0, 119, 204, 0.4)' : 'white',
                    color: isUser ? 'white' : 'black',
                    padding: '10px 15px',
                    borderRadius: '10px',
                    maxWidth: '70%',
                    wordWrap: 'break-word',
                }}
            >
                {content}
            </Typography>
        </Box>
    );
};

export default ChatMessage;
