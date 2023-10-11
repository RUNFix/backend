import { response } from "express";
import BillModel from "../models/bill";
import { Bill } from "../interfaces/bill";


const insertBill = async (item:Bill)=>{
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

const updateBill = async (id:string, data:Bill) => {
    const responseUpdate = await BillModel.findOneAndUpdate({_id:id},data,{new:true});
    return responseUpdate;
}

const deleteBill = async (id:string) => {
    const responseDelete = await BillModel.findOneAndDelete({_id:id});
    return responseDelete;
}
export {insertBill, getUserBills, getCarBills,getBills, updateBill, deleteBill}