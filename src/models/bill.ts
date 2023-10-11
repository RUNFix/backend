import { Schema,Types,model,Model } from "mongoose";
import { Bill } from "../interfaces/bill";


const billItemSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        enum: [0,10,20,30,40,50,60,70,80,90],
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    }
})

const billSchema = new Schema<Bill>(
    {
        state: {
            default: "Pendiente",
            type: String,
            required: true,
            enum: ["Pendiente","Pago"]
        },
        plate: {
            type: String,
            required: true,
        },
        cc: {
            type: Number,
            required: true,
        },
        items: {
            type: [billItemSchema],
        },
        total: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
     }
)

const BillModel = model('Bills', billSchema);

export default BillModel;