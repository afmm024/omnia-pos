import { useCartStore } from "@/domain/store/CartStore";
import { formatColombianMoney } from "@/presentation/helpers/priceUtils";
import { Box, Divider, Group, rem, Text } from "@mantine/core";



export default function CartFooter() {

    const totalStyle = {
        fontWeight: 'bold',
        fontSize: rem(20),
    };
    const {taxAmount, subtotal, total} = useCartStore((state) => state);
    return (
        <>
            <Box>
                {/* Total */}
                <Group justify="space-between">
                    <Text size="xl" style={totalStyle}>
                        TOTAL
                    </Text>
                    <Text size="xl" c={'primary'} style={totalStyle}>
                        {formatColombianMoney(total)}
                    </Text>
                </Group>
            </Box>
        </>
    )
}