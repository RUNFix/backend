import { Auth } from "../interfaces/auth";
import { Employee } from "../interfaces/employee";
import employeeModel from "../models/employee";

const registerNewUser = async ({cc, password, fullName, age, position, email, phone}: Employee) => {
    const checkIs = await employeeModel.findOne({cc});
    if(checkIs) return "ALREADY_USER";
    const registerNewUser = await employeeModel.create({cc, password, fullName, age, position, email, phone })
    return registerNewUser;
};
    
const loginUser = async () => {};

export {registerNewUser, loginUser}