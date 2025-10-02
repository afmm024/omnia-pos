import React from 'react';
import {
    Paper,
    ThemeIcon,
    Stack,
    Text,
    rem,
    useMantineTheme,
    CSSProperties
} from '@mantine/core';
import { CategoryCardProps } from './types';
import { LucideNotebook } from 'lucide-react';


function CategoryCard({ title, count, active, id, onClick }: CategoryCardProps) {
    const theme = useMantineTheme();
    const activeBorderColor = `var(--mantine-primary-color-6)`;
    const defaultBorderColor = `var(--mantine-color-gray-3)`;

    const cardStyles: CSSProperties = {
        padding: 'var(--mantine-spacing-md)',
        width: rem(160),
        height: rem(120),
        borderRadius: 'var(--mantine-radius-md)',
        cursor: 'pointer',
        transition: 'all 150ms ease',
        border: active
            ? `2px solid ${activeBorderColor}`
            : `1px solid ${defaultBorderColor}`,
        boxShadow: active ? 'none' : 'var(--mantine-shadow-sm)', // Sombra si no está activo
        backgroundColor: 'var(--mantine-color-white)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    };

    return (
        <Paper
            withBorder={!active} // Solo bordes sutiles si no está activa
            shadow={active ? 'none' : 'sm'}
            style={cardStyles}
            onClick={() => onClick(id)}
        >
            <ThemeIcon
                variant={active ? 'filled' : 'light'}
                radius="xl"
                color={active ? 'primary' : 'gray'}
            >
                <LucideNotebook style={{ width: rem(18), height: rem(18) }}
                    color={active ? 'white' : theme.colors.gray[7]}
                />
            </ThemeIcon>

            <Stack gap={rem(4)} align="flex-start">
                <Text
                    size="md"
                    fw={active ? 600 : 500}
                    color={active ? 'primary' : 'dark'}
                >
                    {title}
                </Text>
                <Text size="sm" color="dimmed" fw={500}>
                    {count} Items
                </Text>
            </Stack>
        </Paper>
    );
}

export default CategoryCard;