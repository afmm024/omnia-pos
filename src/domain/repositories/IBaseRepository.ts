import { ResponseApi } from "../types/ResponseType";

export default interface IBaseRepository<T> {
    getAll(): Promise<ResponseApi<T>>;
    getById(id: string): Promise<ResponseApi<T>>;
    create(data: T): Promise<ResponseApi<T>>;
    update(id: string, data: T): Promise<ResponseApi<T>>;
    delete(id: string): Promise<boolean>;
}