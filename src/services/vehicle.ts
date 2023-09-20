import { Vehicle } from "../interfaces/vehicle";
import vehicleModel from "../models/vehicle";



const insertveh= async (vehicle: Vehicle) => {
    const responseInsert = await vehicleModel.create(vehicle);
    return responseInsert;
};

const getVechls = async ()=> {
    const responseEmployee = await vehicleModel.find({})
    return responseEmployee;

}

const getVehl = async (id:string)=> {
    const responseEmployee = await vehicleModel.findOne({id:id});
    return responseEmployee;
}

const updateVeh =  async(id:string, data:Vehicle)=>{
    const responseEmployee = await vehicleModel.findOneAndUpdate({id:id}, data, {new:true,});
    return responseEmployee;
}

const deleteVeh = async (id:string)=> {
    const responseEmployee = await vehicleModel.deleteOne({id:id});
    return responseEmployee;
}
export { insertveh, getVechls, getVehl, updateVeh, deleteVeh};
