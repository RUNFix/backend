import { Schema,Types,model,Model } from "mongoose";
import { Employee } from "../interfaces/employee";

const itemSchema = new Schema<Employee>(
    {
        
        fullName: { type: String,required: true },
        cc: { type: Number, required: true },
        age: { type: Number, required: true },
        position: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
    
);

const employeeModel = model<Employee>("Employee", itemSchema);
export default employeeModel;

