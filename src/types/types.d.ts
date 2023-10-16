// types.d.ts or express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    token?: string | JwtPayload;
  }
}
