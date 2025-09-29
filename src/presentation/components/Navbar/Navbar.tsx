import { LucideBoxes, LucideCircleDollarSign, LucideHome, LucideLayoutDashboard, LucideLogOut } from "lucide-react";
import { Button, Group } from '@mantine/core';
import classes from './styles.module.css'
import Logo from "../Logo";
import LogtoService from "@/data/provider/logto/LogtoService";
import { LinksGroup } from "./components/NavGroup/NavGroup";



export default function Navbar() {
    const logtoService = new LogtoService();
    const menuData = [
        { label: 'Inicio', icon: LucideHome, action: '/pos' },
        { label: 'Ventas', icon: LucideCircleDollarSign, action: '/pos' },
        { label: 'Inventario', icon: LucideBoxes, action: '/pos' },
        {
            label: 'Administración',
            icon: LucideLayoutDashboard,
            initiallyOpened: true,
            links: [
                { label: 'Productos', link: '/' },
            ],
        },
        
    ]

    const links = menuData.map((item, index) => (
        <LinksGroup key={index} {...item} />
    ));

    return (
        <div className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group p={'md'} className={classes.header} justify="center">
                    <Logo size={180} />
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <Button fullWidth size="md" radius="md" variant="outline" leftSection={<LucideLogOut strokeWidth={1.5} />} onClick={async () => await logtoService.logoutUser()}>
                    Cerrar sesión
                </Button>
            </div>
        </div>
    )
}