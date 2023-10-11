import { Request, Response, response } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertBill, getUserBills , getCarBills, getBills, updateBill, deleteBill} from "../services/bill"
import { updatePriceToPay} from "../services/vehicle"
//If param is a cc, then search by user, if it is a plate, search by car
const getBillsByParam = async ({params}:Request, res: Response) => {
    try{
        const {param}=params;
        
        //console.log(param)
        if(Number.isNaN(Number(param))){//if param is a plate
            const responseGet= await getCarBills(param);
                
            if(responseGet.length){
                res.send(responseGet);
            }else{res.send('NOT_BILLS_FOR_THIS_CAR')}

        }else{//if param is a cc
            const responseGet= await getUserBills(Number(param));
            if(responseGet.length){
                res.send(responseGet);
            }else{res.send('NOT_BILLS_FOR_THIS_USER')}
        }
    }catch (e){
        handleHttp(response,'ERROR_GET_BILLS')
    }
}

const getBillsController = async (req:Request, res: Response)=> {
    try{
        const responseGet = await getBills();
        res.send(responseGet);
    }catch (e){
        handleHttp(response,'ERROR_UPDATE_BILL')
    }
}

const updateBillController = async ({params, body}:Request, res: Response)=> {
    try{
        const {id} = params;
        const responseUpdate = await updateBill(id,body);
        res.send(responseUpdate);
    }catch (e){
        handleHttp(response,'ERROR_UPDATE_BILL')
    }
}

const postBill = async ({body}:Request, res: Response)=> {
    try{
    
        const responseBill = await insertBill(body);

        //logic for updating the vehicle table TODO
        const {plate} = body;
        const {total} = body;
        const updatedPrice = updatePriceToPay(plate,total,1)
        if(updatedPrice!==null){
            res.send(body)
        }else{
            throw new Error();
        }
    }catch (e){
        handleHttp(res,'ERROR_POST_BILL',e)
    }
}

const deleteBillController = async ({params}:Request, res: Response)=> {
    try{
        const {id}=params;
        const responseDelete = await deleteBill(id);
        if(responseDelete){
            res.send("SUCCESSFULLY_DELETED");
        }else{res.send("BILL_NOT_FOUND");}
    }catch (e){
        handleHttp(response,'ERROR_DELETE_BILL')
    }
}


export { updateBill, postBill, deleteBill, getBillsController,getBillsByParam, updateBillController,deleteBillController};