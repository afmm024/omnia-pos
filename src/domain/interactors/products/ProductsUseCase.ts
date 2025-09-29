import RepositoryTypes from "@/domain/types/RepositoryTypes";
import { inject, injectable } from "inversify";
import type IProductRepository from "@/domain/repositories/IProductsRepository";

@injectable()
export default class ProductsUseCase{
    private _productsRepository: IProductRepository;
    constructor(
        @inject(RepositoryTypes.ProductsRepository) productsRepository: IProductRepository
    ) {
        this._productsRepository = productsRepository;
    }

    async searchProductByCriteria(searchValue: string){
        return await this._productsRepository.getAllBySearch(searchValue);
    }
}
