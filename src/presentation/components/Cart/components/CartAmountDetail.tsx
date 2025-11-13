import { useCartStore } from "@/domain/store/CartStore";
import { formatColombianMoney } from "@/presentation/helpers/priceUtils";
import { Card, Divider, Group, rem, Stack, Text } from "@mantine/core";



export default function CartAmountDetail() {
    const { taxAmount, subtotal, total } = useCartStore((state) => state);
    return (
        <>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                mb={10}
                style={{
                    maxWidth: rem(400),
                    backgroundColor: 'var(--mantine-color-white)'
                }}>
                <Stack gap="xs">
                    <Group justify="space-between">
                        <Text size="md" c="dimmed">
                            Subtotal
                        </Text>
                        <Text size="md" fw={500}>
                            {formatColombianMoney(subtotal)}
                        </Text>
                    </Group>
                    <Group justify="space-between">
                        <Text size="md" c="dimmed">
                            Impoconsumo 8%
                        </Text>
                        <Text size="md" fw={500}>
                            {formatColombianMoney(taxAmount)}
                        </Text>
                    </Group>
                    <Divider
                        style={{ borderStyle: 'dashed' }}
                        my={2}
                    />
                    <Group justify="space-between">
                        <Text size="lg" fw={600}>
                            Total a pagar
                        </Text>
                        <Text size="xl" fw={700} c="primary">
                            {formatColombianMoney(total)}
                        </Text>
                    </Group>
                </Stack>
            </Card>
        </>
    )
}