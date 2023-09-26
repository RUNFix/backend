import { Employee } from "../interfaces/employee";
import employeeModel from "../models/employee";



const insertEmpl= async (employee: Employee) => {
    const responseInsert = await employeeModel.create(employee);
    return responseInsert;
};

const getEmpls = async ()=> {
    const responseEmployee = await employeeModel.find({})
    return responseEmployee;

}

const getEmpl = async (cc:string)=> {
    const responseEmployee = await employeeModel.findOne({cc:cc});
    return responseEmployee;
}

const updateEmpl =  async(cc:string, data:Employee)=>{
    const responseEmployee = await employeeModel.findOneAndUpdate({cc:cc}, data, {new:true,});
    return responseEmployee;
}

const deleteEmpl = async (cc:string)=> {
    const responseEmployee = await employeeModel.deleteOne({cc:cc});
    return responseEmployee;
}

export { insertEmpl, getEmpls, getEmpl, updateEmpl, deleteEmpl};
