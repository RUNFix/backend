import { NextFunction, Request, Response } from "express"
const logMiddleware = (req: Request, res:Response, next: NextFunction) => {
    console.log("Somos la banda")
    next();
    
};

export{logMiddleware};