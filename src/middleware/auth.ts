import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload, verify } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.handle';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'token.010101';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh.01010101';

export interface UserPayload {
  data: { cc: string, role: string },
  iat: number,
  exp: number
}
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  console.log("Body of request", req.body)
  if (!bearerToken) {
    return res.status(401).send({ message: 'No authorization header provided' });
  }

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No token provided in the authorization header' });
  }
  try {
    const decoded: JwtPayload | string = await verifyToken(token);
    (req as CustomRequest).token = decoded;
    console.log('decoded',(req as CustomRequest).token)
    next();
  }
  catch (err:any ){
  if (err.name === 'TokenExpiredError') {
    console.log("No estoy autenticando")
    return res.status(401).send({ message: 'TokenExpiredError' });
  }
  return res.status(401).json({ message: 'Unauthorized' });
}
};

const adminAuthorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user }: any = (req as CustomRequest).token;
    console.log("Token del rol", user.data.role)
    if(user.data.role != "Administrador") {
      throw new Error("Do not posses credential for this action");
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
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

export { authMiddleware, refreshAuthMiddleware, adminAuthorize };
