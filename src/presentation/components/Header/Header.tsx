import { ActionIcon, Group, Indicator, rem, Text } from "@mantine/core";
import { LucidePower } from "lucide-react";
import CalendarBadge from "../CalendarBadge";
import ClockBadge from "../ClockBadge";

export default function Header() {
   

    return (
        <Group
            align="center"
            justify="space-between"
            gap="xl"
        >
            <CalendarBadge />
            <ClockBadge />
            <Group gap="sm" wrap="nowrap" bg={'white'} pl={10} bdrs={20} style={{ boxShadow: 'var(--mantine-shadow-xs)' }}>
                <Group gap={rem(4)} wrap="nowrap">
                    <Indicator
                        color={'green'}
                        processing
                        m={rem(5)}
                    />
                    <Text color="green" fw={500} size="sm">
                        Abrir turno
                    </Text>
                </Group>

                {/* Icono de Power con el fondo suave de color */}
                <ActionIcon
                    size="xl"
                    radius="xl"
                    variant="light" // O 'filled' con un color muy claro
                    color="green"
                    onClick={() => console.log('Prueba')}
                >
                    <LucidePower style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
            </Group>
        </Group>
    )
}