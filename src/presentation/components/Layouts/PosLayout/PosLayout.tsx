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

export default function PosLayout({ children }: Props) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    return (
        <AppShell
            layout="alt"
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { desktop: !desktopOpened },
            }}
            aside={{
                width: 300,
                breakpoint: "md",
                collapsed: { desktop: desktopOpened },

            }}
            padding="md"
        >
            <AppShell.Header withBorder={false} bg={"#fafafa"}>
                <Group h="100%" px="md" justify="space-between">
                    <Burger
                        opened={mobileOpened}
                        onClick={toggleMobile}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Burger
                        opened={desktopOpened}
                        onClick={toggleDesktop}
                        visibleFrom="sm"
                        size="sm"
                    />
                    <Header />
                </Group>
            </AppShell.Header>

            <AppShell.Aside>
                Carrito
            </AppShell.Aside>

            <AppShell.Navbar>
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main bg={"#fafafa"}>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}