import IBillRepository from "@/domain/repositories/IBillRepository"
import { injectable } from "inversify"
import axiosClient from "../provider/axios/axiosClient";
import { CashierBill, CashierBillCart } from "@/domain/types/CashierType";
import { ResponseApi } from "@/domain/types/ResponseType";

@injectable()
export default class BillRepository implements IBillRepository {
    async getBills(id: string): Promise<ResponseApi<CashierBill>> {
        try {
            const response = await axiosClient.get(`/v1/bill/${id}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async createBill(id: string, bill: CashierBillCart): Promise<ResponseApi<string>> {
        try {
            const response = await axiosClient.post(`/v1/bill/${id}`, bill);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
}