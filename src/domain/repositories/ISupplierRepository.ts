import { ResponseApi } from "../types/ResponseType";
import { Supplier } from "../types/SupplierType";
import IBaseRepository from "./IBaseRepository";

export default interface ISupplierRepository extends IBaseRepository<Supplier> {
    getAllBySearch(searchValue: string): Promise<ResponseApi<Supplier>>;

}