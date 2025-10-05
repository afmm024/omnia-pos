import { CartItem } from "@/domain/store/CartStore";
import { ImageResources } from "@/presentation/config/resources";
import { formatColombianMoney } from "@/presentation/helpers/priceUtils";
import { ActionIcon, Box, Card, Group, Image, rem, Text } from "@mantine/core";
import { LucideMinus, LucidePlus } from "lucide-react";

interface Props {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: 1 | -1) => void;
}

export default function CartItemCard({ item, onUpdateQuantity }: Props) {
    return (
        <Card padding="sm" shadow="none" withBorder={false}>
            <Group wrap="nowrap" align="center" style={{ width: '100%' }}>
                <Image
                    src={ImageResources.icons.food}
                    alt={item.name}
                    h={rem(60)}
                    w={rem(60)}
                    radius="md"
                />

                <Box flex={1}>
                    <Text fw={500} size="md">
                        {item.name}
                    </Text>
                    <Text c="dimmed" size="sm" mb={5}>
                        {formatColombianMoney(item.price)}
                    </Text>
                </Box>
                <Group gap="xs" wrap="nowrap" ml="auto">
                    <ActionIcon
                        variant="outline"
                        size="lg"
                        aria-label="Decrease quantity"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 0}
                    >
                        <LucideMinus style={{ width: rem(16), height: rem(16) }} strokeWidth={1.5} />
                    </ActionIcon>
                    <Text size="lg" style={{ minWidth: rem(20), textAlign: 'center' }}>
                        {item.quantity}
                    </Text>
                    <ActionIcon
                        variant="outline"
                        size="lg"
                        aria-label="Increase quantity"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                        <LucidePlus style={{ width: rem(16), height: rem(16) }} strokeWidth={1.5} />
                    </ActionIcon>
                </Group>
            </Group>
        </Card>
    )
}