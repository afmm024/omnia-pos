
import AuthRepository from "@/data/repositories/AuthRepository"
import BillRepository from "@/data/repositories/BillRepository";
import CashierRepository from "@/data/repositories/CashierRepository";
import InventoryRepository from "@/data/repositories/InventoryRepository";
import ProductsRepository from "@/data/repositories/ProductsRepository";
import SupplierRepository from "@/data/repositories/SupplierRepository";
import AuthUseCase from "@/domain/interactors/auth/AuthUseCase";
import BillUseCase from "@/domain/interactors/bill/BillUseCase";
import CashierUseCase from "@/domain/interactors/cashiers/CashierUseCase";
import InventoryUseCase from "@/domain/interactors/inventory/InventoryUseCase";
import ProductsUseCase from "@/domain/interactors/products/ProductsUseCase";
import SupplierUseCase from "@/domain/interactors/suppliers/SuppliersUseCase";
import IAuthRepository from "@/domain/repositories/IAuthRepository"
import IBillRepository from "@/domain/repositories/IBillRepository";
import ICashierRepository from "@/domain/repositories/ICashierRepository";
import IInventoryRepository from "@/domain/repositories/IInventoryRepository";
import IProductRepository from "@/domain/repositories/IProductsRepository";
import ISupplierRepository from "@/domain/repositories/ISupplierRepository";
import RepositoryTypes from "@/domain/types/RepositoryTypes"
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { Container } from "inversify"

const container = new Container();

// Repositories
container.bind<IAuthRepository>(RepositoryTypes.AuthRepository).to(AuthRepository);
container.bind<IProductRepository>(RepositoryTypes.ProductsRepository).to(ProductsRepository);
container.bind<IInventoryRepository>(RepositoryTypes.InventoryRepository).to(InventoryRepository);
container.bind<ISupplierRepository>(RepositoryTypes.SupplierRepository).to(SupplierRepository);
container.bind<ICashierRepository>(RepositoryTypes.CashierRepository).to(CashierRepository);
container.bind<IBillRepository>(RepositoryTypes.BillRepository).to(BillRepository);


// Use Cases
container.bind<AuthUseCase>(UseCaseTypes.AuthUseCase).to(AuthUseCase);
container.bind<ProductsUseCase>(UseCaseTypes.ProductsUseCase).to(ProductsUseCase);
container.bind<InventoryUseCase>(UseCaseTypes.InventoryUseCase).to(InventoryUseCase);
container.bind<SupplierUseCase>(UseCaseTypes.SupplierUseCase).to(SupplierUseCase);
container.bind<CashierUseCase>(UseCaseTypes.CashierUseCase).to(CashierUseCase);
container.bind<BillUseCase>(UseCaseTypes.BillUseCase).to(BillUseCase);


export default container;