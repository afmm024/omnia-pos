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
import { ImageResources } from '@/presentation/config/resources';
import { formatColombianMoney, formatStringPrice } from '@/presentation/helpers/priceUtils';
import classes from '../styles/card.module.css';

export default function ProductCard({ id, name, price, taxes, onProductClick }: ProductCardProps) {
  return (
    <Card
      shadow="none"
      padding="md"
      radius="md"
      withBorder
      className={classes.cardActive}
      style={{
        width: '100%',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 150ms ease',
        boxShadow: 'none',
        '&:hover': {
          transform: 'scale(1.02)',
        }
      }}
      onClick={() => onProductClick({
        id,
        name,
        price: formatStringPrice(price),
        quantity: 1,
        taxes
      })}
    >
      <Card.Section>
        <Image
          src={ImageResources.icons.food}
          h={rem(120)}
          alt={name}
          fit="contain"
          style={{ padding: rem(8) }}
        />
      </Card.Section>

      <Card.Section mt="sm" p={10}>
        <Text fw={300} size="md" ta={'center'} tt="capitalize" lh={1}>
          {name}
        </Text>
      </Card.Section>

      <Text c={'primary'} fw={600} size="lg" ml="auto">
        {formatColombianMoney(formatStringPrice(price))}
      </Text>

    </Card>
  );
};