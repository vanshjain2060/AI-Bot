import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post("/user/login", {
        email,
        password,
    });
    if(response.status !== 200) {
        throw new Error("Unable to login");
    }
    const data = await response.data;
    console.log(data);
    return data;
}

export const checkAuthStatus = async () => {
    const response = await axios.get("/user/auth-status");
    if(response.status !== 200) {
        throw new Error("Unable to Authenticate");
    }
    const data = await response.data;
    console.log(data);
    return data;
}

export const sendChatRequest = async (message: string) => {
    console.log("inside sendChatRequest");
    const response = await axios.post("/chat/new", {message});
    if(response.status !== 200) {
        throw new Error("Unable to Send Chat");
    }
    const data = await response.data;
    console.log(data);
    return data;
}

export const fetchChatHistory = async () => {
    const response = await axios.get('/chat/history'); // Endpoint to fetch chat history
    if (response.status !== 200) {
        throw new Error('Failed to fetch chat history');
    }
    return response.data.chats; // Assuming backend sends an array of chats
};

export const deleteUserChats = async () => {
    const response = await axios.delete('/chat/delete');
    if (response.status !== 200) {
        throw new Error('Failed to delete user chats');
    }
    return response.data; // Assuming backend sends a success message
};


export const userLogout = async () => {
    const response = await axios.get('/user/logout');
    if (response.status !== 200) {
        throw new Error('Failed to logout user');
    }
    return response.data; // Assuming backend sends a success message
};