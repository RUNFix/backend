import { response } from "express";
import BillModel from "../models/bill";
import vehicleModel from "../models/vehicle";
import { Bill } from "../interfaces/bill";


const insertBill = async (item:Bill)=>{
    const responseVehicle = await vehicleModel.findOne({plate: item.plate});
    if (!responseVehicle) return "VEHICLE_DOES_NOT_EXIST";
    // TODO: check if client exist "USER_DOES_NOT_EXIST"

    const responseInsert = await BillModel.create(item);
    return responseInsert;
}

//returns every bill in the system
const getBills = async ()=>{
    const responseGet = await BillModel.find({});
    return responseGet;
}

const getUserBills =async (cc:Number) => {
    const responseGet = await BillModel.find({cc:cc});
    return responseGet;
}

const getCarBills = async (plate:string) => {
    const responseGet = await BillModel.find({plate:plate});
    return responseGet;
}

const updateBill = async (id:string, data: Partial<Bill>) => {
    const responseUpdate = await BillModel.findOneAndUpdate({_id:id},{$set:data},{new:true});
    return responseUpdate;
}

const deleteBill = async (id:string) => {
    const responseDelete = await BillModel.findOneAndDelete({_id:id});
    return responseDelete;
}
export {insertBill, getUserBills, getCarBills,getBills, updateBill, deleteBill}