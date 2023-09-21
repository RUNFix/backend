import { NextFunction, Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertveh,deleteVeh,getVechls,getVehl,updateVeh} from "../services/vehicle";
import fileUpload, { UploadedFile } from 'express-fileupload';

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

const updateVehicle= async({params, body}:Request, res:Response)=>{
    try{
        const {id} = params;
        const response = await updateVeh(id,body);
        res.send(response);

    }catch(e){
        handleHttp(res, 'ERROR_UPDATE_ITEM');
    }
}

const postVehicle = async (req: Request, res: Response) => {
    try {
        let tempFilePath;

        if (req.files?.image) {
            const uploadedFile = req.files.image as UploadedFile; // Usando type assertion para indicar que es un archivo único
            tempFilePath = uploadedFile.tempFilePath;
        }

        if (typeof req.body.parts === 'string') {
            try {
              req.body.parts = JSON.parse(req.body.parts);
            } catch (e) {
              return res.status(400).send('Invalid parts format');
            }
          }

        const response = await insertveh(req.body, tempFilePath);
        res.send(response);
    } catch (e) {
        console.error(e);
        handleHttp(res, 'ERROR_POST_ITEM');
    }
};

const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vehicleId = req.params.id;

        if (!vehicleId) {
            return res.status(400).json({ message: 'Vehicle ID is required' });
        }

        const response = await deleteVeh(vehicleId);
        res.send(response);

    } catch (error) {
        console.error(error);
        handleHttp(res, 'ERROR_DELETE_VEHICLE');
    }
};

export{getVehicle, getVehicles, updateVehicle, postVehicle, deleteVehicle};

