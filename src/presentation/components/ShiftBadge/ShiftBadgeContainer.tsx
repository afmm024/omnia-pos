import { useShiftStore } from "@/domain/store/CashierStore";
import { ActionIcon, Button, Group, Indicator, rem, Text } from "@mantine/core";
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
        <Indicator
            color={status ? 'red' : 'green'}
            processing
            m={rem(5)}>
            <Button variant="light"
                color={status ? 'red' : 'green'}
                onClick={() => status ? onAction(shift?.id) : onAction()} leftSection={status ? <LucidePowerOff style={{ width: rem(18), height: rem(18) }} /> : <LucidePower style={{ width: rem(18), height: rem(18) }} />}>
                {status ? 'Cerrar turno' : 'Abrir turno'}
            </Button>
        </Indicator>
    )
}