"use client"
import LogtoService from "@/data/provider/logto/LogtoService";
import { Profile } from "@/data/types/profile.type";
import { Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";

type Props = {
    profile: Profile | null;
}

export default function AuthForm({ profile }: Props) {
    const logtoService = new LogtoService();
    const route = useRouter();
    return (
        <div >
            {
                profile && <Stack>
                    <Button fullWidth mt="xl" size="md" radius="md" onClick={async () => route.push('/sales')}>
                        Ir a mi Dashboard
                    </Button>
                </Stack>
            }
            {
                !profile && <Button fullWidth mt="xl" size="md" radius="md" onClick={async () => await logtoService.authenticateUser()}>
                    Iniciar sesión
                </Button>
            }
        </div>
    )
}