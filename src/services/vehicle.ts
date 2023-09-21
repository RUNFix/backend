import { Vehicle } from "../interfaces/vehicle";
import vehicleModel from "../models/vehicle";
import { uploadImage, deleteImage } from '../config/cloudinary';
import fs from 'fs-extra';



const insertveh = async (vehicle: Vehicle, tempFilePath?: string) => {
    if (tempFilePath) {
        const result = await uploadImage(tempFilePath);
        vehicle.images = result.secure_url;
        await fs.unlink(tempFilePath);
    const responseInsert = await vehicleModel.create(vehicle);
    return responseInsert;
    }
};
const getVechls = async ()=> {
    const responseEmployee = await vehicleModel.find({})
    return responseEmployee;

}

const getVehl = async (id:string)=> {
    const responseEmployee = await vehicleModel.findOne({_id:id});
    return responseEmployee;
}

const updateVeh =  async(id:string, data:Vehicle)=>{
    const responseEmployee = await vehicleModel.findOneAndUpdate({id:id}, data, {new:true,});
    return responseEmployee;
}

const deleteVeh = async (id: string): Promise<Vehicle | null> => {
    const vehicle = await vehicleModel.findById(id);
    
    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    if (vehicle.images) {
        const publicId = extractPublicIdFromUrl(vehicle.images); 
        await deleteImage(publicId);
    }

    await vehicle.deleteOne({_id:id});
    return vehicle;
};

// Función auxiliar para extraer el publicId de una URL de Cloudinary
function extractPublicIdFromUrl(url: string): string {
    return url.split('/').slice(-1)[0].split('.')[0];
}
export { insertveh, getVechls, getVehl, updateVeh, deleteVeh};
