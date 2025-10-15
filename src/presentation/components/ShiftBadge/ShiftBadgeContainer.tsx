import { useShiftStore } from "@/domain/store/CashierStore";
import { ActionIcon, Group, Indicator, rem, Text } from "@mantine/core";
import { LucidePower, LucidePowerOff } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    onAction: (id?: string) => void;
}

export default function ShiftBadgeContainer({ onAction }: Props) {
    const { shift } = useShiftStore((state) => state);
    const [status, setStatus] = useState<boolean>(false)
    useEffect(() => {
        if (shift) {
            setStatus(shift.status === 'open' ? true : false);
        }
    }, [shift])
    return (
        <Group gap="sm" wrap="nowrap" bg={'white'} pl={10}>
            <> <Group gap={rem(4)} wrap="nowrap">
                <Indicator
                    color={status ? 'red' : 'green'}
                    processing
                    m={rem(5)}
                />
                <Text c={status ? 'red' : 'green'} fw={500} size="sm">
                    {status ? 'Cerrar turno' : 'Abrir turno'}
                </Text>
            </Group>
                <ActionIcon
                    size="xl"
                    radius="xl"
                    variant="light"
                    color={status ? 'red' : 'green'}
                    onClick={() => status ? onAction(shift?.id) : onAction()}
                >
                    {status ? <LucidePowerOff style={{ width: rem(18), height: rem(18) }} /> : <LucidePower style={{ width: rem(18), height: rem(18) }} />}
                </ActionIcon></>
        </Group>
    )
}