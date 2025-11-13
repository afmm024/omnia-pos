import { Group } from "@mantine/core";
import CalendarBadge from "../CalendarBadge";
import ClockBadge from "../ClockBadge";
import ShiftBadge from "../ShiftBadge/ShiftBadge";
import NetworkBadge from "../NetworkStatus/Networkstatus";
import PrinterBadge from "../Printer/PrinterStatus";

export default function Header() {
    return (
        <Group
            align="center"
            justify="space-between"
            gap="xl"
        >   
            <NetworkBadge />
            <ShiftBadge />
        </Group>
    )
}