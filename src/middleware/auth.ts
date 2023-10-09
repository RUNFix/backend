import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload, verify } from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'token.010101';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh.01010101';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).send({ message: 'No authorization header provided' });
  }

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: 'No token provided in the authorization header' });
  }

  try {
    const decoded: JwtPayload | string = verify(token, ACCESS_TOKEN_SECRET as Secret);
    (req as CustomRequest).token = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'TokenExpiredError' });
    }
  }
};

const refreshAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).send({ message: 'No authorization header provided' });
  }

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: 'No token provided in the authorization header' });
  }

  try {
    const decodedRefreshToken: JwtPayload | string = verify(
      token,
      REFRESH_TOKEN_SECRET as Secret,
    );
    (req as CustomRequest).token = decodedRefreshToken;
    next();
  } catch (refreshErr) {
    return res.status(401).send({ message: 'Invalid refresh token' });
  }
};

export { authMiddleware, refreshAuthMiddleware };
