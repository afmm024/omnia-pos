import { Product } from "../types/ProductType";
import { ResponseApi } from "../types/ResponseType";
import IBaseRepository from "./IBaseRepository";

export default interface IProductRepository extends IBaseRepository<Product> {
    getAllBySearch(searchValue: string): Promise<ResponseApi<Product>>;
}