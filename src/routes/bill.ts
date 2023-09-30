import { Request, Response, Router } from "express";

import {updateBill, deleteBill, postBill, getBillsController , getBillsByParam, deleteBillController, updateBillController} from "../controllers/bill";
const router = Router();

router.get('/:param', getBillsByParam);
router.get('/', getBillsController);
router.post("/", postBill);
router.put('/:id', updateBillController);
router.delete('/:id', deleteBillController);

export {router};