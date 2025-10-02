import React, { useState } from 'react';
import { Carousel } from '@mantine/carousel';

import CategoryCard from './CategoryCard';
import { Category } from './types';
import { Box } from '@mantine/core';

function CategoryList() {
    const initialCategories: Category[] = [
        { id: 'all', title: 'Todos', count: 110, active: true },
        { id: 'hot', title: 'Bebidas Calientes', count: 20, active: false },
        { id: 'ice', title: 'Bebidas Frías', count: 20, active: false },
        { id: 'preparations', title: 'Preparaciones', count: 35, active: false },
        { id: 'snacks', title: 'Snacks', count: 35, active: false },
        { id: 'fries', title: 'Fritos', count: 35, active: false },
        { id: 'bread', title: 'Horneables', count: 35, active: false },
    ];

    const [categories, setCategories] = useState(initialCategories);

    const handleCardClick = (id: string) => {
        setCategories(
            categories.map(cat => ({
                ...cat,
                active: cat.id === id,
            }))
        );
    };



    return (
        <Box w="100%" px="md" py="xl" style={{ overflow: 'hidden' }}>
            <Carousel
                dragFree
                slidesToScroll={1}
                align={'center'}
                slideSize="20%"
                slideGap="sm"
                withControls={false}
                styles={{
                    container: { overflowX: 'scroll', scrollbarWidth: 'none' },
                    viewport: { overflowX: 'scroll', scrollbarWidth: 'none' },
                }}
            >
                {categories.map((category) => (
                    <Carousel.Slide key={category.id}>
                        <CategoryCard
                            {...category}
                            onClick={handleCardClick}
                        />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Box>
    );
}

export default CategoryList;