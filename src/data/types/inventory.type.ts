import { InventoryType } from "@/domain/enums/InventoryTypes.enum";

export interface InventoryDTO {
    Stock: number;
    ReorderPoint: number;
    SupplierId: string;
    Reference: string;
    Type: InventoryType;
}