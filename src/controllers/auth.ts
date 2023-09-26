import { Request, Response } from "express";
import { registerNewUser, loginUser} from "../services/auth"
const registerCtrl = async({body}: Request, res: Response) => {
    const responseUser = await registerNewUser(body)
    res.send(responseUser)
};  

const loginCtrl = async({body}: Request, res:Response) => {
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

export {registerCtrl,loginCtrl}
