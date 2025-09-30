'use client';
import React from 'react';
import { 
  Card, 
  Image, 
  Text, 
  Badge, 
  Group, 
  rem 
} from '@mantine/core';
import { ProductCardProps } from './types'; 

export default function ProductCard({ id, name, state, price, onProductClick }: ProductCardProps) {

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="lg"
      withBorder
      style={{ 
        width: '100%',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 150ms ease',
        '&:hover': {
          transform: 'scale(1.02)',
        }
      }}
      onClick={() => onProductClick(id)}
    >
      <Card.Section>
        <Image
          src={"https://placehold.co/300?text=Image"}
          height={rem(130)}
          alt={name}
          fit="cover"
          style={{ paddingBottom: rem(8) }} 
        />
      </Card.Section>

      <Group justify="space-between" mt="md" wrap="nowrap" align="flex-end" h={rem(60)}>
        <div>
            <Text fw={500} size="md" tt="capitalize" lh={1.3}>
              {name.split('-')[1]}
            </Text>
          
            <Badge 
              variant="light" 
              radius="sm" 
              size="xs"
              c="dimmed" 
              style={{ padding: `${rem(1)} ${rem(6)}`, marginTop: rem(4) }}
            >
              {state}
            </Badge>
        </div>


        <Text fw={600} size="lg" ml="auto">
          {price}
        </Text>
      </Group>

    </Card>
  );
};