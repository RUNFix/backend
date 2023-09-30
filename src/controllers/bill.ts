import { Request, Response, response } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertBill, getUserBills , getCarBills, getBills} from "../services/bill"

//If param is a cc, then search by user, if it is a plate, search by car
const getBillsByParam = async ({params}:Request, res: Response) => {
    try{
        const {param}=params;
        
        //console.log(param)
        if(Number.isNaN(Number(param))){//if param is a plate
            console.log("SI LLEGA ACA!!!!!")
            console.log(typeof(param))
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

const updateBill = (req:Request, res: Response)=> {
    try{

    }catch (e){
        handleHttp(response,'ERROR_UPDATE_BILL')
    }
}

const postBill = async ({body}:Request, res: Response)=> {
    try{
        const responseBill = await insertBill(body);
        res.send(body)
    }catch (e){
        handleHttp(res,'ERROR_POST_BILL',e)
    }
}

const deleteBill = (req:Request, res: Response)=> {
    try{

    }catch (e){
        handleHttp(response,'ERROR_DELETE_BILL')
    }
}


export { updateBill, postBill, deleteBill, getBillsController,getBillsByParam};