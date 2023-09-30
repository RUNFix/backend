export interface Bill{
    state: string;
    plate: string;
    cc:number;
    items: BillItem[];
}

interface BillItem {
    quantity: number;
    itemDescription: string;
    price: number;
    discount: number;
}