import { Auth } from "../interfaces/auth";
import { Employee } from "../interfaces/employee";
import employeeModel from "../models/employee";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateRefreshToken, generateToken, verifyRefreshToken } from "../utils/jwt.handle";
import cookie from 'cookie';

const registerNewUser = async ({cc, password, fullName, age, position, email, phone}: Employee) => {
    const checkIs = await employeeModel.findOne({cc});
    if(checkIs) return "ALREADY_USER";
    const passHash = await encrypt(password);
    const registerNewUser = await employeeModel.create({
        cc, 
        password: passHash,
        fullName, 
        age, 
        position, 
        email, 
        phone })
    return registerNewUser;
};
    
const loginUser = async ({cc, password}: Auth) => {
    const checkIs = await employeeModel.findOne({cc});
    if(!checkIs) return "NOT_FOUND_USER";

    const passHash = checkIs.password;
    const isCorrect = await verified(password, passHash);

    if(!isCorrect) return "PASSWORD_INCORRECT";

    const role = checkIs.position;
    const token = await generateToken({cc,role});
    const refreshToken = await generateRefreshToken({cc,role});
    const data ={token,refreshToken,user:checkIs};

    return data

};

const refreshAccessToken = async (refreshToken: string) => {
    try {

        const decoded: any = await verifyRefreshToken(refreshToken);
        console.log(typeof decoded);
        console.log(decoded)

        const user = await employeeModel.findOne({cc: decoded.data.cc});
        
        if (!user) return "NOT_FOUND_USER";

        const newAccessToken = await generateToken(decoded);
        return { token: newAccessToken };
    } catch (error) {
        console.log(error)
        return "INVALID_REFRESH_TOKEN";
    }
};
 
const updatePassword = async (cc:string, password:Auth) => {

    const checkIs = await employeeModel.findOne({cc});
    if(!checkIs) return "NOT_FOUND_USER";

    // Actualizar la contraseña
    const isCorrect = await verified(password.password, checkIs.password);
    if(isCorrect) return "IS NOT POSIBLE TO OVERRIDE THE PASSWORD WITH THE SAME PASSWORD";


    const newPassHash = await encrypt(password.password);
    const responsePassword = await employeeModel.findOneAndUpdate({cc:cc}, {password:newPassHash}, {new:true,});
    console.log("Password updated successfully");
    return responsePassword;

     
}

export {registerNewUser, loginUser, updatePassword, refreshAccessToken}