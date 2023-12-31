import { Request, Response } from 'express';
import { registerNewUser, loginUser, refreshAccessToken, updatePassword } from '../services/auth';
import { generateToken, verifyToken } from '../utils/jwt.handle';
import { handleHttp } from '../utils/error.handle';

const registerCtrl = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body);
  res.send(responseUser);
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { cc, password } = body;
  const responseUser = await loginUser({ cc, password });

  if (responseUser === 'PASSWORD_INCORRECT' || responseUser === 'NOT_FOUND_USER') {
    return res.status(403).send({ message: responseUser });
  }
  res.send({
    accessToken: responseUser.token,
    user: responseUser.user,
    refreshToken: responseUser.refreshToken,
  });
};

const refreshCtrl = async (req: Request, res: Response) => {
  // Get refreshToken from request body
  const { refreshToken } = req.body;

  if (refreshToken) {
    const responseUser = await refreshAccessToken(refreshToken);

    if (responseUser === 'INVALID_REFRESH_TOKEN' || responseUser === 'NOT_FOUND_USER') {
      return res.status(403).send({ message: responseUser });
    }

    console.log('token que se envia', responseUser);
    res.send({
      accessToken: responseUser,
    });
  } else {
    console.log('No autorizado');
    return res.status(406).json({ message: 'Unauthorized' });
  }
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
export { registerCtrl, loginCtrl, refreshCtrl, updatePassCtrl };