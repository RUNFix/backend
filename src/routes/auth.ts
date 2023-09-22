import { Request,Response,Router } from "express";
import {registerCtrl, loginCtrl} from "../controllers/auth"
import { authToken } from "../middleware/auth";

const router = Router()

/*http://localhost:4000/auth/login [POST] */
router.post("/register", registerCtrl);
router.post("/login", loginCtrl);

export { router };