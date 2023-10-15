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
        handleHttp(response,'ERROR_GET_BILL')
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
    // TODO: check if client AND vehicle exist
    try{
    
        const responseBill = await insertBill(body);
        if (responseBill === "VEHICLE_DOES_NOT_EXIST") {
            return res.status(400).send({ message: responseBill});
        }
        //logic for updating the vehicle table
        const {plate} = body;
        const {total} = body;
        const updatedPrice = await updatePriceToPay(plate,total,1)
        if((responseBill!==null)&&(updatedPrice!==null)){
            res.send(body)
        }else{
            //this undo whatever half of the operation was done
            if((typeof responseBill) !== 'string') deleteBill(responseBill.id);
            if(updatedPrice) updatePriceToPay(plate,total,-1);
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