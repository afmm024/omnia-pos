"use client"
import LogtoService from "@/data/provider/logto/LogtoService";
import { Button, Stack } from "@mantine/core";


export default function AuthForm() {
    const logtoService = new LogtoService();
    return (
        <div >
            <Button fullWidth mt="xl" size="md" radius="md" onClick={async () => await logtoService.authenticateUser()}>
                Iniciar sesión
            </Button>
        </div>
    )
}