import { Box, Typography, Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import SyntaxHighlighter from "react-syntax-highlighter"; // Fixed import
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const block = message.split("```").filter((_, index) => index % 2 !== 0); // Only take code blocks
        return block;
    }
    return null; // Ensure a return value
}

function isCodeBlock(str: string) {
    return ( // Corrected the logic to properly detect code blocks
        str.includes(";") ||
        str.includes("=") ||
        str.includes("#") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("//") ||
        str.includes("{") ||
        str.includes("}")
    );
}

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
    const messageBlocks = extractCodeFromString(content);

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

            <Box>
                {!messageBlocks && (
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
                )}
                {messageBlocks && messageBlocks.length > 0 && messageBlocks.map((block, index) =>
                (isCodeBlock(block) ? (
                    <SyntaxHighlighter style={coldarkDark} language="javascript" key={index}>
                        {block}
                    </SyntaxHighlighter>
                ) : (
                    <Typography
                        key={index}
                        sx={{
                            backgroundColor: isUser ? 'rgba(0, 119, 204, 0.4)' : 'white',
                            color: isUser ? 'white' : 'black',
                            padding: '10px 15px',
                            borderRadius: '10px',
                            maxWidth: '70%',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre',
                        }}
                    >
                        {block}
                    </Typography>
                ))
                )}
            </Box>
        </Box>
    );
};

export default ChatMessage;
