"use client"
import { Button, rem, Text } from "@mantine/core";
import { LucideClock } from "lucide-react";
import { useEffect, useState } from "react";
import Clock from 'react-live-clock';


export default function ClockBadge() {
    const [isMounted, setIsMounted] = useState(false);

    const buttonStyle = {
        borderRadius: rem(100),
        padding: rem(10),
        height: 'auto',
        boxShadow: 'var(--mantine-shadow-xs)'
    };

    const iconSize = rem(20);

    useEffect(() => {
        setIsMounted(true)
    }, [])
    return (
        <Button
            variant="white"
            styles={{
                root: buttonStyle,
                label: { padding: `${rem(5)} ${rem(10)}` }
            }}
            p={5}
            leftSection={<LucideClock style={{ width: iconSize, height: iconSize }} />}
        >
            <Text size="sm" fw={500}>
                {isMounted && <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />}
            </Text>
        </Button>
    )
}