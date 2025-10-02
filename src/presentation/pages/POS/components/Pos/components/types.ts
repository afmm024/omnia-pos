import { Product } from "@/domain/types/ProductType";

export interface Category {
    id: string;
    title: string;
    count: number;
    active: boolean;
}
export interface CategoryCardProps extends Category {
    onClick: (id: string) => void;
}

export interface ProductCardProps extends Product {
  onProductClick: (id: string) => void; 
}