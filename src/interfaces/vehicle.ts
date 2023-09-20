import { Date } from "mongoose";

interface Part {
    name: string;
    description: string;
}


export interface vehicle {
    Name: string;
    cc: number;
    Model: string;
    Brand: string;
    Year: number;
    Color: string;
    Status: string;
    PriceToPay: number;
    Employee: string;
    Parts: Part[];
    Date: Date;
    images:string;



}