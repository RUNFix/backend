import { Request, Response, Router } from "express";
import {
  getVehicle,
  getVehicles,
  updateVehicle,
  postVehicle,
  deleteVehicle,
} from "../controllers/vehicle";
import { logMiddleware } from "../middleware/log";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/", getVehicles);
router.get("/:plate", logMiddleware, getVehicle);
router.post(
  "/",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  postVehicle
);
router.put("/:plate", updateVehicle);
router.delete("/:id", deleteVehicle);

export { router };
