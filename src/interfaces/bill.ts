export interface Bill{
    state: string;
    plate: string;
    cc:number;
    items: BillItem[];
    total:number;
    pdfLink: string;
}

interface BillItem {
    quantity: number;
    itemDescription: string;
    price: number;
    discount: number;
    subtotal:number;
}