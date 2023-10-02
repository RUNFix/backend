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
  const token = req.headers.authorization!.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: 'No authorization header provided' });
  }

  try {
    const decoded: any = verify(token, ACCESS_TOKEN_SECRET);
    (req as CustomRequest).token = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.cookies.jwt;
      console.log('pasé')
      console.log('Refresh:' ,req.cookies.jwt)
      console.log(refreshToken)
      if (!refreshToken) {
        return res.status(401).send({ message: 'No refresh token provided' });
      }
      console.log('pasé 2')
      const newToken = await refreshAccessToken(refreshToken);
      console.log(newToken)
      if (newToken === 'INVALID_REFRESH_TOKEN') {
        return res.status(401).send({ message: 'Invalid refresh token' });
      }

      console.log('New Access Token:', newToken); // Log the new access token
      console.log('New Refresh Token:', refreshToken); // Log the new refresh token

      res.setHeader('Authorization', `Bearer ${newToken}`);
      res.cookie('jwt', newToken, { httpOnly: true, 
        sameSite: 'none', secure: true, 
        maxAge: 24 * 60 * 60 * 1000 });
      next();
    } else {
      return res.status(401).send({ message: 'Invalid token' });
    }
  }
};

export { authMiddleware };
