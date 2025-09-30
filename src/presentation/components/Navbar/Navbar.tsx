"use client"
import {Group } from '@mantine/core';
import classes from './styles.module.css'
import Logo from "../Logo";
import { LinksGroup } from "./components/NavGroup/NavGroup";
import { useLogtoSession } from "@/presentation/hooks/useLogtoSession";
import { mappedUser } from "@/presentation/helpers/mappedUser";
import { ROLES } from "@/domain/enums/Roles.enum";
import { menuData } from "@/presentation/helpers/menuData";
import { UserButton } from "../UserButton/UserButton";



export default function Navbar() {
    const { claims } = useLogtoSession();
    const user = claims && mappedUser(claims);

    const links = menuData.map((item, index) => {
        if(item.role.includes(user?.metadata[1] as ROLES)){
            return  <LinksGroup key={index} {...item} />
        }
    });

    return (
        <div className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group p={'md'} className={classes.header} justify="center">
                    <Logo size={180} />
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                {user && <UserButton name={user.name} email={user.email}/>}
            </div>
        </div>
    )
}