import { Group } from "@mantine/core";
import ShiftBadge from "../ShiftBadge/ShiftBadge";
import NetworkBadge from "../NetworkStatus/Networkstatus"

interface Props {
    withShift?: boolean,
    withNetwork?: boolean
}

export default function Header({ withNetwork, withShift}: Props) {
    return (
        <Group
            align="center"
            justify="space-between"
            gap="xl"
        >   
            { withNetwork && <NetworkBadge />}
            { withShift && <ShiftBadge />}
        </Group>
    )
}