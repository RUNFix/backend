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
        min: 0,
        max: 100,
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
        pdfLink: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
        versionKey: false,
     }
)

const BillModel = model('Bills', billSchema);

export default BillModel;