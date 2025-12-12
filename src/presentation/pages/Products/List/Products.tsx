"use client"
import ProductsUseCase from "@/domain/interactors/products/ProductsUseCase";
import { Product } from "@/domain/types/ProductType";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import DashboardLayout from "@/presentation/components/Layouts/DashboardLayout";
import container from "@/presentation/config/inversify.config";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { LucideCheck, LucideX } from "lucide-react";
import { ProductDTO } from "@/data/types/product.type";
import ProductsContainer from "./ProductsContainer";


export default function ProductsPage() {
    const productCase = container.get<ProductsUseCase>(UseCaseTypes.ProductsUseCase);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = () => {
        setIsLoading(true);
        productCase.getAllProducts().then((products) => {
            setProducts(products?.data as Product[]);
            notifications.show({
                title: 'Consulta de productos',
                message: 'Se ha consultado los productos correctamente',
                color: 'green',
                withCloseButton: true,
            })
        }).catch((error) => {
            console.error('Error al buscar productos:', error);
            notifications.show({
                title: 'Consulta de productos',
                message: 'Ha ocurrido un error al consultar los productos',
                color: 'red',
                withCloseButton: true,
            })
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const handleUpdate = (item: Product) => {
        const id = notifications.show({
            loading: true,
            title: 'Operación de producto',
            message: 'Actualizando registro',
            autoClose: false,
            withCloseButton: false,
        });
        const payload: ProductDTO = {
            Name: item.name,
            Price: item.price,
            Type: item.type,
            State: item.state,
            Taxes: item.taxes,
            Unit: item.unit,
        }
        productCase.updateProduct(item.id, payload).then(() => {
            notifications.update({
                id,
                color: 'teal',
                title: 'Operación de producto',
                message: 'Registro actualizado correctamente',
                icon: <LucideCheck size={18} />,
                loading: false,
                autoClose: 3000,
            });
            loadProducts();
        }).catch((error) => {
            console.error('Error al actualizar el producto:', error);
            notifications.update({
                id,
                color: 'red',
                title: 'Operación de producto',
                message: 'Error actualizando el registro',
                icon: <LucideX size={18} />,
                loading: false,
                autoClose: 3000,
            });
        })
    }


    useEffect(() => {
        loadProducts();
    }, [])

    return (
        <DashboardLayout title="Administración de productos">
            <ProductsContainer handleUpdate={handleUpdate} handleRefresh={() => loadProducts()} isLoading={isLoading} products={products} />
        </DashboardLayout>
    )
}