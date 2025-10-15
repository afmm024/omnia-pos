import type IInventoryRepository from "@/domain/repositories/IInventoryRepository";
import RepositoryTypes from "@/domain/types/RepositoryTypes";
import { inject, injectable } from "inversify";

@injectable()
export default class InventoryUseCase{
    private _inventoryRepository: IInventoryRepository;
    constructor(
        @inject(RepositoryTypes.InventoryRepository) inventoryRepository: IInventoryRepository
    ) {
        this._inventoryRepository = inventoryRepository;
    }

    async allProducts(){
        return await this._inventoryRepository.getAll?.();
    }

    async updateStock(id: string, item: any ){
        return await this._inventoryRepository.update?.(id, item);
    }
}
