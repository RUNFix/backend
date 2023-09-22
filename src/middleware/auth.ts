import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.handle';

export const SECRET_KEY: Secret = 'your-secret-key-here';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.headers.authorization!.split(' ')[1];

   if (!token) {
     throw new Error();
   }

   const decoded = verifyToken(token);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
    console.log(err)
   res.status(401).send('Please authenticate');
 }
};