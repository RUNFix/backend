import { Auth } from "./auth";

export interface Employee extends Auth{
    fullName: string;
    age:number;
    position:string;
    email:string;
    phone:number;
  
}

