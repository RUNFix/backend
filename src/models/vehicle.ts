import { Schema,Types, model, Model } from "mongoose";

import { Vehicle } from "../interfaces/vehicle";

const PartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const ItemSchema = new Schema<Vehicle>(
    {
        name:{
            type:String,
            required:true
        },
        cc:{
            type:Number,    
            required:true
        },
        model:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true
        },
        year:{
            type:Number,
            required:true
        },
        color:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        priceToPay:{
            type:Number,
            required:true
        },
        employee:{
            type:String,
            required:true
        },
        
        parts:{
            type:[PartSchema],
            required:true
        },
        date: {
            type: Date,
            required: true
        },
        images: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const vehicleModel = model('Vehicle', ItemSchema);
export default vehicleModel;