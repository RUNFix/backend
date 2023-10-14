import { Schema, Types, model, Model } from "mongoose";

import { Vehicle } from "../interfaces/vehicle";

const ItemSchema = new Schema<Vehicle>(
  {
    name: {
      type: String,
      required: true,
    },
    plate:{
      type:String,
      required: true,
      unique: true,
    },
    cc: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priceToPay: {
      type: Number,
      required: true,
      default: 0,
    },
    employee: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const vehicleModel = model("Vehicle", ItemSchema);
export default vehicleModel;
