import { sign, verify } from 'jsonwebtoken';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'token.010101';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh.01010101';

const generateToken = async (data: { cc: number; role: string }) => {
  const jwt = sign({ data }, ACCESS_TOKEN_SECRET, {
    expiresIn: '30s',
  });
  return jwt;
};

const generateRefreshToken = async (data: { cc: number; role: string }) => {
  const jwt = sign({ data }, REFRESH_TOKEN_SECRET, {
    expiresIn: '48h',
  });
  console.log("Verificar token", jwt)
  return jwt;
};

const verifyToken = async (jwt: string) => {
  console.log(jwt);
  try {
    const isOk = verify(jwt, ACCESS_TOKEN_SECRET);
    return isOk;
  } catch (error) {
    throw error
  } 
  
};

const verifyRefreshToken = async (jwt: string) => {
  const isOk = verify(jwt, REFRESH_TOKEN_SECRET);
  console.log('Token de refresh verificado', isOk);
  return isOk;
};

export { generateToken, generateRefreshToken, verifyToken, verifyRefreshToken };
