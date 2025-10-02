import { injectable } from "inversify"
import "reflect-metadata";
import axiosClient from "../provider/axios/axiosClient";
import IProductRepository from "@/domain/repositories/IProductsRepository";
import { ResponseApi } from "@/domain/types/ResponseType";
import { Product } from "@/domain/types/ProductType";

@injectable()
export default class ProductsRepository implements IProductRepository {
    async getAllBySearch(searchValue: string): Promise<ResponseApi<Product>> {
        try {
            const queryParams = {
                Search: searchValue,
            };
            const response = await axiosClient.get(`/v1/product/criteria`, { params: queryParams });
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async getAll(): Promise<ResponseApi<Product>> {
        try {
            const response = await axiosClient.get(`/v1/product`);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
    getById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    create(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
