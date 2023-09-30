import { response } from "express";
import BillModel from "../models/bill";
import { Bill } from "../interfaces/bill";


const insertBill = async (item:Bill)=>{
    const responseInsert = await BillModel.create(item);
    return responseInsert;
}

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

export {insertBill, getUserBills, getCarBills,getBills}