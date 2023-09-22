import {sign, verify} from "jsonwebtoken";
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET || 'token.010101';

const generateToken = async (cc:number)=>{
    const jwt = sign({cc},ACCESS_TOKEN_SECRET, {
        expiresIn: '2 days'
      });
    return jwt;
 
}

const verifyToken = async (jwt:string)=>{
    const isOk = verify(jwt, ACCESS_TOKEN_SECRET);
    return isOk;

}

export {generateToken, verifyToken};