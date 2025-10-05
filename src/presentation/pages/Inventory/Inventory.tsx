"use client"
import DashboardLayout from "@/presentation/components/Layouts/DashboardLayout";
import InventoryContainer from "./InventoryContainer";
import container from "@/presentation/config/inversify.config";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import InventoryUseCase from "@/domain/interactors/inventory/InventoryUseCase";
import { useEffect, useState } from "react";
import { InventoryItem } from "@/domain/types/InventoryType";
import { notifications } from "@mantine/notifications";


export default function InventoryPage() {

    const inventoryCase = container.get<InventoryUseCase>(UseCaseTypes.InventoryUseCase);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<InventoryItem[]>([]);

    const loadProducts = () => {
        setIsLoading(true);
        inventoryCase.allProducts().then((products) => {
            setProducts(products.data as InventoryItem[]);
            notifications.show({
                title: 'Consulta de inventario',
                message: 'Se ha consultado el inventario correctamente',
                color: 'green',
                withCloseButton: true,
            })
        }).catch((error) => {
            console.error('Error al buscar productos:', error);
            notifications.show({
                title: 'Consulta de inventario',
                message: 'Ha ocurrido un error al consultar el inventario',
                color: 'red',
                withCloseButton: true,
            })
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadProducts();
    }, [])

    return (
        <DashboardLayout>
            <InventoryContainer handleRefresh={() => loadProducts()} isLoading={isLoading} products={products} />
        </DashboardLayout>
    )
}