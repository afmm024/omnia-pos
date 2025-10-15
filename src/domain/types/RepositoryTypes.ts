const RepositoryTypes = Object.freeze({
  AuthRepository: Symbol("AuthRepository"),
  ProductsRepository: Symbol("ProductsRepository"),
  InventoryRepository: Symbol("InventoryRepository"),
  SupplierRepository: Symbol("SupplierRepository"),
  CashierRepository: Symbol("CashierRepository"),
  BillRepository: Symbol("BillRepository")
})

export default RepositoryTypes