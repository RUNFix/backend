import { Date } from "mongoose";

interface Part {
  name: string;
  description: string;
}

export interface Vehicle {
  id: Number;
  name: string;
  cc: number;
  model: string;
  brand: string;
  year: number;
  color: string;
  status: string;
  priceToPay: number;
  employee: string;
  parts: Part[];
  date: Date;
  images: string[];
}
