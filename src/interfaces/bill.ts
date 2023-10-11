export interface Bill{
    state: string;
    plate: string;
    cc:number;
    items: BillItem[];
    total:number;
}

interface BillItem {
    quantity: number;
    itemDescription: string;
    price: number;
    discount: number;
    subtotal:number;
}