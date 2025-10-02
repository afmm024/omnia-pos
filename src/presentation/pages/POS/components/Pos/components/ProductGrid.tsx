import React from 'react';
import { Box, LoadingOverlay, SimpleGrid } from '@mantine/core';
import ProductCard from './ProductCard';
import { Product } from '@/domain/types/ProductType';

interface Props {
    isLoading: boolean;
    products: Product[];
}

export default function ProductGrid({ isLoading, products }: Props) {

    const handleProductClick = (id: string) => {
        console.log(`Producto seleccionado: ${id}`);
    };

    return (
        <Box pos="relative" h={'100dvh'}>
            <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2}}
                loaderProps={{ color: 'primary', type: 'bars' }}
            />
            <div style={{ overflow: 'hidden', maxWidth: '100%', margin: '0 auto' }}>
                <SimpleGrid type="container"
                    cols={{ base: 1, '300px': 2, '500px': 4, '1100px': 5 }}
                    spacing="xs" verticalSpacing="xs"
                >
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            onProductClick={handleProductClick}
                        />
                    ))}
                </SimpleGrid>
            </div>
        </Box>
    );
}