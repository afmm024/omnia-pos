import { LucideALargeSmall, LucideLogOut } from "lucide-react";
import { useState } from 'react';
import { Code, Group } from '@mantine/core';
import classes from './styles.module.css'
import Logo from "../Logo";



export default function Navbar() {
    const data = [
        { link: '', label: 'Notifications', icon: LucideALargeSmall },
    ];

    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} strokeWidth={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <div className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group p={'md'} className={classes.header} justify="space-between">
                    <Logo size={90} />
                    <Code fw={700}>v{process.env.NEXT_PUBLIC_APP_VERSION}</Code>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <LucideLogOut className={classes.linkIcon} strokeWidth={1.5} />
                    <span>Cerrar sesión</span>
                </a>
            </div>
        </div>
    )
}