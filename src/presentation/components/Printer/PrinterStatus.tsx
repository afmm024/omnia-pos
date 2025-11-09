"use client"
import { useQZTrayStore } from "@/domain/store/PrinterStore";
import { Group, rem, Text as TextLabel } from "@mantine/core";
import { LucidePrinter } from "lucide-react";
import { useEffect } from "react";

export default function PrinterBadge() {
    const { isConnected, printers, connect, setDefaultPrinter, defaultPrinter } = useQZTrayStore();

    useEffect(() => {
        connect()
    }, [isConnected])


    useEffect(() => {
        const findDefault = printers.find((printer) => printer.includes("SATQ"))
        if (findDefault) {
            setDefaultPrinter(findDefault)
        }
    }, [printers])


    return (
        <Group gap={rem(4)}>
            {!isConnected ? <LucidePrinter color={isConnected ? 'green' : 'red'} size={20} /> : <LucidePrinter color={isConnected ? 'green' : 'red'} size={20} />}
            <TextLabel c={!isConnected ? 'red' : 'green'} fw={500} size="sm">
                {isConnected ? defaultPrinter : 'Impresora sin conexión'}
            </TextLabel>
        </Group>
    )
}