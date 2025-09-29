"use client"
import { Button, rem, Text } from "@mantine/core";
import { LucideCalendar } from "lucide-react";
import { useEffect, useState } from "react";

export default function CalendarBadge() {

    const [currentDate, setCurrentDate] = useState<string>('');

    const buttonStyle = {
        borderRadius: rem(100),
        padding: rem(10),
        height: 'auto',
        boxShadow: 'var(--mantine-shadow-xs)'
    };

    const iconSize = rem(20);

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString());
    }, []);


    return (
        <Button
            variant="white"
            styles={{
                root: buttonStyle,
                label: { padding: `${rem(5)} ${rem(10)}` }
            }}
            p={5}
            leftSection={<LucideCalendar style={{ width: iconSize, height: iconSize }} />}
        >
            <Text size="sm" fw={500}>
                {currentDate}
            </Text>
        </Button>
    )
} 