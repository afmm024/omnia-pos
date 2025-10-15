import { Cashier, CashierBill, CashierBillCart } from "../types/CashierType";
import { ResponseApi } from "../types/ResponseType";
import IBaseRepository from "./IBaseRepository";

export default interface ICashierRepository extends IBaseRepository<Cashier> {
    getByUser(): Promise<ResponseApi<Cashier>>;
    closeCashier(id: string, observation: string, excessMoney: number): Promise<ResponseApi<string>>;
    openCashier(baseAmount: number): Promise<ResponseApi<string>>;
}