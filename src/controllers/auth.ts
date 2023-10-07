import { Request, Response } from "express";
import { registerNewUser, loginUser, refreshAccessToken} from "../services/auth"
import { generateToken, verifyToken } from "../utils/jwt.handle";

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
        user: responseUser.user,
        refreshToken: responseUser.refreshToken
    });
};

const refreshCtrl = async (req: Request, res:Response) => {
    //const { cc, password } = body;
    if (req.cookies?.jwt) {
    const jwt = req.cookies
    const responseUser = await refreshAccessToken(jwt)
    console.log(res)
    if (responseUser == "INVALID_REFRESH_TOKEN" || responseUser === "NOT_FOUND_USER") {
        return res.status(403).send({ message: responseUser });
    }
    res.send({
        accessToken: responseUser
    })
    } else {
        console.log("Que putas")
        return res.status(406).json({ message: 'Unauthorized' });
    }   
}

export {registerCtrl,loginCtrl, refreshCtrl}
