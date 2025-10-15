"use client"
import { useEffect, useMemo, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import SearchBar from "./components/SearchBar";
import container from "@/presentation/config/inversify.config";
import ProductsUseCase from "@/domain/interactors/products/ProductsUseCase";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { Product } from "@/domain/types/ProductType";
import { ActionIcon, Button, Group, Stack } from "@mantine/core";
import { LucideRefreshCcw } from "lucide-react";

export default function POS() {

    const productsCase = container.get<ProductsUseCase>(UseCaseTypes.ProductsUseCase);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState('');

    const handleSearch = (q: string) => {
        setQuery(q)
    };

    const filteredProducts = useMemo(() => {
        return [...products].filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
    }, [products, query])


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
            <Group gap={'xs'} justify="space-between">
                <div style={{flexGrow: 1}}><SearchBar onSearch={() => handleSearch("")} onChange={handleSearch} onClear={() => handleSearch("")} /></div>
                <ActionIcon variant="light" size={'input-md'} aria-label="Refresh" onClick={() => loadProducts("")}>
                    <LucideRefreshCcw strokeWidth={1.5} />
                </ActionIcon>
            </Group>
            <ProductGrid isLoading={isLoading} products={filteredProducts} />
        </Stack>
    )
}