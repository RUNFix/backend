import { Request,Response,Router } from "express";
import { getEmployee, getEmployees, updateEmployee, deleteEmployee} from "../controllers/employee";
import { logMiddleware } from "../middleware/log";

const router = Router()


router.get("/", getEmployees);
router.get("/:id",logMiddleware,getEmployee);
//router.post("/",postEmployee );
router.put("/:id",updateEmployee);
router.delete("/:id",deleteEmployee);

export { router };