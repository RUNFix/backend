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

const getEmpl = async (id:String)=> {
    const responseEmployee = await employeeModel.findOne({_id:id});
    return responseEmployee;
}

const updateEmpl =  async(id:String, data:Employee)=>{
    const responseEmployee = await employeeModel.findOneAndUpdate({_id:id}, data, {new:true,});
    return responseEmployee;
}

const deleteEmpl = async (id:String)=> {
    const responseEmployee = await employeeModel.deleteOne({_id:id});
    return responseEmployee;
}
export { insertEmpl, getEmpls, getEmpl, updateEmpl, deleteEmpl};
