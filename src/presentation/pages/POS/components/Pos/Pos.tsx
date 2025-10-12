"use client"
import { useEffect, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import SearchBar from "./components/SearchBar";
import container from "@/presentation/config/inversify.config";
import ProductsUseCase from "@/domain/interactors/products/ProductsUseCase";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { Product } from "@/domain/types/ProductType";
import { Stack } from "@mantine/core";

export default function POS() {

    const productsCase = container.get<ProductsUseCase>(UseCaseTypes.ProductsUseCase);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [data, setData] = useState<Product[]>([]);

    const handleSearch = (q: string) => {
        
    }

    const handleClear = () => {
        
    }

    const loadProducts = (q: string) => {
         setIsLoading(true);
        productsCase.searchProductByCriteria(q).then((products) => {
            setProducts(products.data as Product[]);

        }).catch((error) => {
            console.error('Error al buscar productos:', error);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadProducts('')
    }, []);

    return (
        <Stack justify="space-between" gap={'md'}>
            <SearchBar onSearch={handleSearch} onClear={handleClear}/>
            <ProductGrid isLoading={isLoading} products={products} />
        </Stack>
    )
}