import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import classes from './styles.module.css';
import { LucideKey, LucideLogOut } from 'lucide-react';
import LogtoService from '@/data/provider/logto/LogtoService';

interface Props {
    name: string;
    email: string;
}

export function UserButton({ name, email }: Props) {
    const logtoService = new LogtoService();
    return (
        <>
            <Menu
                width={260}
                position="right"
                transitionProps={{ transition: 'pop-top-right' }}
                withinPortal
            >
                <Menu.Target>
                    <UnstyledButton className={classes.user}>
                        <Group>
                            <Avatar
                                key={name} 
                                name={name} 
                                color="initials"
                                radius="xl"
                            />

                            <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>
                                    {name}
                                </Text>
                                <Text c="dimmed" size="xs">
                                    {email}
                                </Text>
                            </div>
                        </Group>
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Opciones</Menu.Label>
                    <Menu.Item
                        leftSection={<LucideKey size={16} strokeWidth={1.5} />}
                    >
                        Cambiar contraseña
                    </Menu.Item>
                    <Menu.Item color='red' onClick={async() => await logtoService.logoutUser()} leftSection={<LucideLogOut size={16} strokeWidth={1.5} />}>
                        Cerrar sesion
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}