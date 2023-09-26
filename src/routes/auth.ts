import { Request,Response,Router } from "express";
import {registerCtrl, loginCtrl} from "../controllers/auth"

const router = Router()

/*http://localhost:4000/auth/login [POST] */
router.post("/register", registerCtrl);
router.post("/login", loginCtrl);

export { router };