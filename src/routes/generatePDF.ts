import { Request,Response,Router } from "express";
import { getPDF } from "../controllers/generatePDF";

const router = Router();

router.post("/", getPDF);
export { router };