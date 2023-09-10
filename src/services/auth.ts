import { Auth } from "../interfaces/auth";
import { Employee } from "../interfaces/employee";
import employeeModel from "../models/employee";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

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

    const token = await generateToken(cc);
    const data ={token,user:checkIs};

    return data
};
 
const updatePassword = async (cc:string, password:Auth) => {

    // Actualizar la contraseña
    const newPassHash = await encrypt(password.password);
    const responsePassword = await employeeModel.findOneAndUpdate({cc:cc}, {password:newPassHash}, {new:true,});
    console.log("Password updated successfully");
    return responsePassword;

     
}

export {registerNewUser, loginUser, updatePassword}