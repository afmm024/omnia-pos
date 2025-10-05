import { Group } from "@mantine/core";
import CalendarBadge from "../CalendarBadge";
import ClockBadge from "../ClockBadge";
import ShiftBadge from "../ShiftBadge/ShiftBadge";

export default function Header() {


    return (
        <Group
            align="center"
            justify="space-between"
            gap="xl"
        >
            <CalendarBadge />
            <ClockBadge />
           <ShiftBadge />
        </Group>
    )
}