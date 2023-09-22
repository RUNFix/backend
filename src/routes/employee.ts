import { Request,Response,Router } from "express";
import { getEmployee, getEmployees, updateEmployee, postEmployee, deleteEmployee} from "../controllers/employee";
import { logMiddleware } from "../middleware/log";
import { authToken } from "../middleware/auth";

const router = Router()


router.get("/", authToken, getEmployees);
router.get("/:id",authToken,getEmployee);
router.post("/",postEmployee );
router.put("/:id",updateEmployee);
router.delete("/:id",deleteEmployee);

export { router };