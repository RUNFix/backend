import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload, verify } from 'jsonwebtoken';
import { refreshAccessToken } from '../services/auth';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    refreshToken: string; // Añade la propiedad refreshToken a SessionData
  }
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'token.010101';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).send({ message: 'No authorization header provided' });
  }

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No authorization header provided' });
  }

  try {
    const decoded: any = verify(token, ACCESS_TOKEN_SECRET);
    (req as CustomRequest).token = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      console.log('pasé');
      return res.status(401).send({ message: 'Invalid refresh token' });
    } else {
      return res.status(401).send({ message: 'Invalid token' });
    }
  }
};

export { authMiddleware };
