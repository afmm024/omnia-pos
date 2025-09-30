"use client"
import { useState } from "react";
import ProductGrid from "./components/ProductGrid";
import SearchBar from "./components/SearchBar";
import container from "@/presentation/config/inversify.config";
import ProductsUseCase from "@/domain/interactors/products/ProductsUseCase";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { Product } from "@/domain/types/ProductType";

export default function POS() {

    const productsCase = container.get<ProductsUseCase>(UseCaseTypes.ProductsUseCase);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const handleSearch = (q: string) => {
        setIsLoading(true);
        productsCase.searchProductByCriteria(q).then((products) => {
            console.log('Productos encontrados:', products);
            setProducts(products.data);
        }).catch((error) => {
            console.error('Error al buscar productos:', error);
        }).finally(() => {
            setIsLoading(false);
        })
        console.log('Búsqueda ejecutada:', q);
    }

    const handleClear = () => {
        setProducts([])
    }

    return (
        <>
            <SearchBar onSearch={handleSearch} onClear={handleClear}/>
            <ProductGrid isLoading={isLoading} products={products} />
        </>
    )
}