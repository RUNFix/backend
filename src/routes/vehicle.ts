import { Request,Response,Router } from "express";
import {getVehicle, getVehicles, updateVehicles, postVehicles, deleteVehicles} from "../controllers/vehicle";
import { logMiddleware } from "../middleware/log";

const router = Router()


router.get("/", getVehicles);
router.get("/:id",logMiddleware,getVehicle);
router.post("/",postVehicles );
router.put("/:id",updateVehicles);
router.delete("/:id",deleteVehicles);

export { router };