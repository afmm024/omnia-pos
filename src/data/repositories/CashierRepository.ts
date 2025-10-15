import ICashierRepository from "@/domain/repositories/ICashierRepository";
import { ResponseApi } from "@/domain/types/ResponseType";
import { injectable } from "inversify";
import axiosClient from "../provider/axios/axiosClient";
import { Cashier, CashierBill, CashierBillCart } from "@/domain/types/CashierType";


@injectable()
export default class CashierRepository implements ICashierRepository {
    async closeCashier(id: string, observation: string, excessMoney: number): Promise<ResponseApi<string>> {
         try {
            const response = await axiosClient.put(`/v1/cashier/close/${id}`,{
                Observations: observation,
                ExcessMoney: excessMoney
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async openCashier(baseAmount: number): Promise<ResponseApi<string>> {
         try {
            const response = await axiosClient.post(`/v1/cashier/open`, {
                BaseAmount: baseAmount
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async getByUser(): Promise<ResponseApi<Cashier>> {
         try {
            const response = await axiosClient.get(`/v1/cashier/user`);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async getAll(): Promise<ResponseApi<Cashier>> {
        try {
            const response = await axiosClient.get(`/v1/cashier`);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async getById(id: string): Promise<ResponseApi<Cashier>> {
        try {
            const response = await axiosClient.get(`/v1/cashier/${id}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
}