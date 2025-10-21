import type ISupplierRepository from "@/domain/repositories/ISupplierRepository";
import RepositoryTypes from "@/domain/types/RepositoryTypes";
import { inject, injectable } from "inversify";

@injectable()
export default class SupplierUseCase{
    private _supplierRepository: ISupplierRepository;
    constructor(
        @inject(RepositoryTypes.SupplierRepository) supplierRepository: ISupplierRepository
    ) {
        this._supplierRepository = supplierRepository;
    }
    async searchSupplierByCriteria(searchValue: string){
        return await this._supplierRepository.getAllBySearch(searchValue);
    }

    async getAllSuppliers(){
        return await this._supplierRepository.getAll?.();
    }

    async createSupplier(supplier: any){
        return await this._supplierRepository.create?.(supplier);
    }
}