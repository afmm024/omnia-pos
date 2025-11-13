import { useCartStore } from "@/domain/store/CartStore";
import { Button, Card, Divider, Group, rem, Stack, Text, Title } from "@mantine/core";
import { formatColombianMoney } from "@/presentation/helpers/priceUtils";
import SupplierBox from "./SupplierBox";
import OptionsPayment from "./OptionsPayment";

interface Props {
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ResumeBill({
    onCancel,
    onConfirm
}: Props) {
    const { supplier, total, totalItems } = useCartStore((state) => state);
    return (
        <Stack gap={'lg'}>
            <Stack gap={'sm'}>
                <Title order={4} c={'primary'}>
                    Datos del cliente
                </Title>
                <SupplierBox />
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
                                Cliente
                            </Text>
                            <Text size="md" fw={500}>
                                {supplier?.name}
                            </Text>
                        </Group>
                        <Group justify="space-between">
                            <Text size="md" c="dimmed">
                                Tipo documento
                            </Text>
                            <Text size="md" fw={500}>
                                {supplier?.typeDocument}
                            </Text>
                        </Group>
                        <Group justify="space-between">
                            <Text size="md" c="dimmed">
                                # documento
                            </Text>
                            <Text size="md" fw={500}>
                                {supplier?.document}
                            </Text>
                        </Group>
                        <Group justify="space-between">
                            <Text size="md" c="dimmed">
                                Email
                            </Text>
                            <Text size="md" fw={500}>
                                {supplier?.email}
                            </Text>
                        </Group>
                    </Stack>
                </Card>
            </Stack>
            <Stack gap={'lg'}>
                <Title order={4} c={'primary'}>
                    Método de pago
                </Title>
                <OptionsPayment />
            </Stack>
            <Stack gap={'sm'}>
                <Title order={4} c={'primary'}>
                    Confirmación de orden
                </Title>
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
                                Orden #
                            </Text>
                            <Text size="md" fw={500}>
                                123456849
                            </Text>
                        </Group>
                        <Group justify="space-between">
                            <Text size="md" c="dimmed">
                                Cantidad de items
                            </Text>
                            <Text size="md" fw={500}>
                                {totalItems}
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
            </Stack>
            <Button onClick={onConfirm}>Generar factura</Button>
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        </Stack>
    )
}