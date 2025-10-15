import { CashierBill, CashierBillCart } from "../types/CashierType";
import { ResponseApi } from "../types/ResponseType";
import IBaseRepository from "./IBaseRepository";


export default interface IBillRepository extends IBaseRepository<CashierBill>{
    createBill(id: string, bill: CashierBillCart): Promise<ResponseApi<string>>;
    getBills(id: string): Promise<ResponseApi<CashierBill>>;
}