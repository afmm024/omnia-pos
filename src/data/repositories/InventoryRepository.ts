import IInventoryRepository from "@/domain/repositories/IInventoryRepository";
import { InventoryItem } from "@/domain/types/InventoryType";
import { ResponseApi } from "@/domain/types/ResponseType";
import { injectable } from "inversify";
import axiosClient from "../provider/axios/axiosClient";


@injectable()
export default class InventoryRepository implements IInventoryRepository {
    async getAll(): Promise<ResponseApi<InventoryItem>> {
        try {
            const response = await axiosClient.get(`/v1/inventory`);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    getById(id: string): Promise<ResponseApi<InventoryItem>> {
        throw new Error("Method not implemented.");
    }
    create(data: InventoryItem): Promise<ResponseApi<InventoryItem>> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: any): Promise<ResponseApi<InventoryItem>> {
         try {
            const response = await axiosClient.put(`/v1/inventory/${id}`, data);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}