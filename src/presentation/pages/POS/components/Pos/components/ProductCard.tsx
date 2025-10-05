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
      shadow="sm"
      padding="md"
      radius="lg"
      withBorder
      className={classes.cardActive}
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

      <Card.Section mt="sm" p={5}>
        <Text fw={500} size="md" tt="capitalize" lh={1.3}>
          {name}
        </Text>
      </Card.Section>

      <Text c={'primary'} fw={600} size="lg" ml="auto">
        {formatColombianMoney(formatStringPrice(price))}
      </Text>

    </Card>
  );
};