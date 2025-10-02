import { InventoryItem } from "../types/InventoryType";
import IBaseRepository from "./IBaseRepository";

export default interface IInventoryRepository extends IBaseRepository<InventoryItem> {
    
}