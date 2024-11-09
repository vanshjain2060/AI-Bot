import jwt from "jsonwebtoken";
export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }); 
    // it's syntax is like that jwt.sign({payload object}, secret string, {other extras things in this object})
    return token;
}