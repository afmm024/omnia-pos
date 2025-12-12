"use client";
import {
    AppShell,
    Burger,
    Group,
    Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "../../Navbar";
import Header from "../../Header";

interface Props {
    children: React.ReactNode;
    title: string
}

export default function DashboardLayout({ children, title }: Props) {
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
                    <Header withNetwork />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar>
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main >
                <Title mb={20} order={3} c={'primary'}>{title}</Title>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}