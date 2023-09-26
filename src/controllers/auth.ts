import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle"
import { registerNewUser, loginUser, updatePassword} from "../services/auth"

const registerCtrl = async({body}: Request, res: Response) => {
    const responseUser = await registerNewUser(body)
    res.send(responseUser)
};  

const loginCtrl = async({ body }: Request, res: Response) => {
    const { cc, password } = body;
    const responseUser = await loginUser({ cc, password });

    if (responseUser === "PASSWORD_INCORRECT" || responseUser === "NOT_FOUND_USER") {
        return res.status(403).send({ message: responseUser });
    }

    res.send({
        accessToken: responseUser.token,
        refreshToken: responseUser.refreshToken,
        user: responseUser.user
    });
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
