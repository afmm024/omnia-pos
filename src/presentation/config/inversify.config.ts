
import AuthRepository from "@/data/repositories/AuthRepository"
import InventoryRepository from "@/data/repositories/InventoryRepository";
import ProductsRepository from "@/data/repositories/ProductsRepository";
import AuthUseCase from "@/domain/interactors/auth/AuthUseCase";
import InventoryUseCase from "@/domain/interactors/inventory/InventoryUseCase";
import ProductsUseCase from "@/domain/interactors/products/ProductsUseCase";
import IAuthRepository from "@/domain/repositories/IAuthRepository"
import IInventoryRepository from "@/domain/repositories/IInventoryRepository";
import IProductRepository from "@/domain/repositories/IProductsRepository";
import RepositoryTypes from "@/domain/types/RepositoryTypes"
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { Container } from "inversify"

const container = new Container();

// Repositories
container.bind<IAuthRepository>(RepositoryTypes.AuthRepository).to(AuthRepository);
container.bind<IProductRepository>(RepositoryTypes.ProductsRepository).to(ProductsRepository);
container.bind<IInventoryRepository>(RepositoryTypes.InventoryRepository).to(InventoryRepository);

// Use Cases
container.bind<AuthUseCase>(UseCaseTypes.AuthUseCase).to(AuthUseCase);
container.bind<ProductsUseCase>(UseCaseTypes.ProductsUseCase).to(ProductsUseCase);
container.bind<InventoryUseCase>(UseCaseTypes.InventoryUseCase).to(InventoryUseCase);

export default container;