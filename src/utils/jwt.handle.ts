import {sign, verify} from "jsonwebtoken";
const JWT_SECRET=process.env.JWT_SECRET || 'token.010101';

const generateToken = async (cc:number)=>{
    const jwt = sign({cc},JWT_SECRET,{
        expiresIn: "8h",
    });
    return jwt;
 
}

const verifyToken = async (jwt:string)=>{
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;

}

export {generateToken, verifyToken};