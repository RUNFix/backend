import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'token.010101';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh.010101';

const generateToken = async (cc: number) => {
    const jwt = sign({ cc }, JWT_SECRET, {
        expiresIn: "15m",
    });
    return jwt;
}

const generateRefreshToken = async (cc: number) => {
    const jwt = sign({ cc }, REFRESH_SECRET, {
        expiresIn: "1h", 
    });
    return jwt;
}

const verifyToken = async (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
}

const verifyRefreshToken = async (jwt: string) => {
    const isOk = verify(jwt, REFRESH_SECRET);
    return isOk;
}

export { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken };
