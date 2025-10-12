"use client";
import {
    AppShell,
    Burger,
    Group
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "../../Navbar";
import Header from "../../Header";
import Cart from "../../Cart/Cart";

interface Props {
    children: React.ReactNode;
}

export default function PosLayout({ children }: Props) {
    return (
        <AppShell
            layout="alt"
            header={{ height: 60 }}
            navbar={{
                width: 250,
                breakpoint: "sm",
            }}
            aside={{
                width: 380,
                breakpoint: "md",

            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="end">
                    <Header />
                </Group>
            </AppShell.Header>

            <AppShell.Aside>
                <Cart />
            </AppShell.Aside>

            <AppShell.Navbar>
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main h={'100dvh'}>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}