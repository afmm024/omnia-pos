export interface Cashier {
    openShiftDate:   string;
    closeShiftDate:  string;
    state:           string;
    userId:          string;
    baseAmount:      number;
    cashAmount:      number;
    transfersAmount: number;
    totalAmount:     number;
    totalBills:      number;
    excessMoney:     number;
    observations:    string;
    createdAt:       string;
    updatedAt:       string;
    id:              string;
}



export interface CashierBill {
    SupplierId: string;
    Items: BillItem[];
    CashAmount: number;
    Total: number;
    Taxes: number;
    TransferAmount: number;
    TypePayment: string;
}

export interface BillItem {
    IdProduct: string;
    Name: string;
    Price: number;
    Quantity: number;
    Taxes: number;
    Total: number;
    TaxesId: string;
}