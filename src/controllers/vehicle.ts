import { NextFunction, Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertveh,deleteVeh,getVechls,getVehl,updateVeh} from "../services/vehicle";

const getVehicle=async({params}:Request, res:Response)=>{
    try{
        const {id} = params;
        const response = await getVehl(id);
        res.send(response);
    }catch(e){
        handleHttp(res, 'ERROR_GET_ITEM');
    }
}

const getVehicles= async(req:Request, res:Response)=>{
    try{
        const response = await getVechls();
        res.send(response);
    }catch(e){
        handleHttp(res, 'ERROR_GET_ITEMS');
    }
}

const updateVehicles= async({params, body}:Request, res:Response)=>{
    try{
        const {id} = params;
        const response = await updateVeh(id,body);
        res.send(response);

    }catch(e){
        handleHttp(res, 'ERROR_UPDATE_ITEM');
    }
}

const postVehicles=async ({body}:Request, res:Response)=>{
    try{
        const response= await insertveh(body);
        res.send(response)
    }catch(e){
        handleHttp(res, 'ERROR_POST_ITEM');
    }
}

const deleteVehicles= async({params}:Request, res:Response, next: NextFunction)=>{
    try{
        const {id} = params;
        const response = await deleteVeh(id);
        res.send(response);
    }catch(e){
        handleHttp(res, 'ERROR_DELETE_ITEM');
    }
}

export{getVehicle, getVehicles, updateVehicles, postVehicles, deleteVehicles};

