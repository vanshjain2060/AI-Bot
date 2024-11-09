import { Response } from 'express';
import { createToken } from "./token-manager.js";

export const COOKIE_NAME = 'auth_token';

export const setAuthToken = (res: Response, userId: string, email: string, cookieName: string = COOKIE_NAME) => {
    // here we only use res that's why we don't write req and next
    // First, we want to remove the previous cookies and set the new one
    res.clearCookie(cookieName, {
        path: '/',
        domain: 'localhost',
        httpOnly: true,
        signed: true,
    });

    // Creating JWT token and storing it in the browser
    const token = createToken(userId, email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Sending the cookies to the front end
    res.cookie(cookieName, token, {
        path: '/',
        domain: 'localhost',
        expires: expires,
        httpOnly: true,
        signed: true,
    });
};
