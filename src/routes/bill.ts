import { Request, Response, Router } from "express";

import {updateBill, deleteBill, postBill, getBillsController , getBillsByParam} from "../controllers/bill";
const router = Router();

router.get('/:param', getBillsByParam);
router.get('/', getBillsController);
router.post("/", postBill);
//router.put('/:id', updateBill);
//router.delete('/:id', deleteBill);

export {router};