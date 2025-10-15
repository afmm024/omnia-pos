import RepositoryTypes from "@/domain/types/RepositoryTypes";
import { inject, injectable } from "inversify";
import type IProductRepository from "@/domain/repositories/IProductsRepository";
import { ProductDTO } from "@/data/types/product.type";

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

    async getAllProducts(){
        return await this._productsRepository.getAll?.();
    }

    async updateProduct(id: string, item: ProductDTO ){
        return await this._productsRepository.update?.(id, item as any);
    }

    async createProduct(item: ProductDTO ){
        return await this._productsRepository.create?.(item as any);
    }
}
