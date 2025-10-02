
export interface InventoryItem {
    productName: string;
    productId: string;
    wareHouse: string;
    stock: number;
    reorderPoint: number;
    createdAt: Date;
    updatedAt: Date;
    id: string;
}