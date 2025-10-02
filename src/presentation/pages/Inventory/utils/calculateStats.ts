import { InventoryItem } from "@/domain/types/InventoryType";
import { incrementRuleReorder } from "./rules";

export const calculateStats = (items: InventoryItem[]) => {
    return {
        outStock: items.filter((item) => item.stock === 0).length,
        reorderStock: items.length - (items.filter((item) => item.stock <= (item.reorderPoint + incrementRuleReorder)).length),
    }
}