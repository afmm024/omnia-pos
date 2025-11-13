"use client"
import useNetworkStatus from "@/presentation/hooks/useNetworkStatus";
import { Group, rem, Text } from "@mantine/core";
import { LucideWifi, LucideWifiOff } from "lucide-react";


export default function NetworkBadge() {
    const { isOnline } = useNetworkStatus();
    return (
        <Group gap={rem(4)}>
            {!isOnline ? <LucideWifiOff color={isOnline ? 'green' : 'red'} size={20} /> : <LucideWifi color={isOnline ? 'green' : 'red'} size={20} />}
            <Text c={!isOnline ? 'red' : 'green'} fw={500} size="sm">
                {isOnline ? 'Conectado a internet' : 'No conectado a internet'}
            </Text>
        </Group>
    )
}