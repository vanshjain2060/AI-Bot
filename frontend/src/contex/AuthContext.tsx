import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginUser } from "../helpers/api-communication";

type User = { name: string, email: string };
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email:string, password:string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);
// this is a simple auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsloggedIn] = useState(false);

    useEffect(() => {
        // fetch is the user's cookies are vaild then skip login
    }, [])

    const login = async (email: string, password: string) => {
        console.log("login", email, password);
        
        const data = await loginUser(email, password);
        if(data) {
            setUser({email:data.email, name:data.name});
            setIsloggedIn(true);
        }
    };
    const signup = async (name: string, email: string, password: string) => { };
    const logout = async () => { };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => useContext(AuthContext);