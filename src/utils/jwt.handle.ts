import {sign, verify} from "jsonwebtoken";
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET || 'token.010101';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh.01010101';
const generateToken = async (data:{cc:number,role:string})=>{
    const jwt = sign({data},ACCESS_TOKEN_SECRET, {
        expiresIn: '10s'
      });
    return jwt;
 
}

const generateRefreshToken = async (data:{cc:number,role:string}) => {
    const jwt = sign({ data }, REFRESH_TOKEN_SECRET, {
        expiresIn: "1h", 
    });
    return jwt;
}

const verifyToken = async (jwt:string)=>{
    console.log(jwt)
    const isOk = verify(jwt, ACCESS_TOKEN_SECRET);
    return isOk;

}

const verifyRefreshToken = async (jwt: string) => {
    const isOk = verify(jwt, REFRESH_TOKEN_SECRET);
    return isOk;
}

export {generateToken, generateRefreshToken, verifyToken, verifyRefreshToken};