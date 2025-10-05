import ISupplierRepository from "@/domain/repositories/ISupplierRepository";
import { ResponseApi } from "@/domain/types/ResponseType";
import { Supplier } from "@/domain/types/SupplierType";
import { injectable } from "inversify";
import axiosClient from "../provider/axios/axiosClient";


@injectable()
export default class SupplierRepository implements ISupplierRepository {
    async getAllBySearch(searchValue: string): Promise<ResponseApi<Supplier>> {
        try {
            const queryParams = {
                Search: searchValue,
            };
            const response = await axiosClient.get(`/v1/supplier/criteria`, { params: queryParams });
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async getAll(): Promise<ResponseApi<Supplier>> {
        try {
            const response = await axiosClient.get(`/v1/supplier`);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    getById(id: string): Promise<ResponseApi<Supplier>> {
        throw new Error("Method not implemented.");
    }
    create(data: Supplier): Promise<ResponseApi<Supplier>> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Supplier): Promise<ResponseApi<Supplier>> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}