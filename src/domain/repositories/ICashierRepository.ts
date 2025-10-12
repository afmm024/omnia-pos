import { Cashier, CashierBill, CashierBillCart } from "../types/CashierType";
import { ResponseApi } from "../types/ResponseType";
import IBaseRepository from "./IBaseRepository";

export default interface ICashierRepository extends IBaseRepository<Cashier> {
    getByUser(): Promise<ResponseApi<Cashier>>;
    closeCashier(id: string, observation: string, excessMoney: number): Promise<ResponseApi<string>>;
    openCashier(baseAmount: number): Promise<ResponseApi<string>>;
    createBill(id: string, bill: CashierBillCart): Promise<ResponseApi<string>>;
    getBills(id: string): Promise<ResponseApi<CashierBill>>;
}