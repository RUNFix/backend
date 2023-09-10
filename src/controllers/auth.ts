import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle"
import { registerNewUser, loginUser, updatePassword} from "../services/auth"
const registerCtrl = async({body}: Request, res: Response) => {
    const responseUser = await registerNewUser(body)
    res.send(responseUser)
};  

const loginCtrl = async({body}: Request, res:Response) => {
    const {cc, password} = body;
    const responseUser = await loginUser({cc, password})

    if (responseUser === "PASSWORD_INCORRECT") {
        res.status(403);
    }
    res.send(responseUser)
};

const updatePassCtrl= async({params,body}:Request, res:Response)=>{
    try{
        const {id} = params;
        const response = await updatePassword(id,body);
        res.send(response);

    }catch(e){
        handleHttp(res, 'ERROR_UPDATE_PASSWORD');
    }
}

export {registerCtrl,loginCtrl,updatePassCtrl}
