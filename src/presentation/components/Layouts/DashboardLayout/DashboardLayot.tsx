"use client";
import {
    AppShell,
    Burger,
    Group
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "../../Navbar";
import Header from "../../Header";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    return (
        <AppShell
            layout="alt"
            header={{ height: 60 }}
            navbar={{
                width: 250,
                breakpoint: "sm"
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="end">
                    <Header />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar>
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main >
                {children}
            </AppShell.Main>
        </AppShell>
    )
}