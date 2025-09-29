'use client';

import { useEffect } from 'react';
import { Center, Loader, Box, Stack } from '@mantine/core';
import Image from 'next/image';

import { ImageResources } from '@/presentation/config/resources';
import { useLogtoSession } from '@/presentation/hooks/useLogtoSession';
import { redirect } from 'next/navigation';
import Logo from '../Logo';

export function SplashScreen() {

    const { isAuthenticated } = useLogtoSession();

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(isAuthenticated)
            if(!isAuthenticated){
                redirect('/auth')
            }else{
                redirect('/pos')
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [3000]);

    return (
        <>
            <Center
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'var(--mantine-color-body)',
                    zIndex: 1000,
                }}
            >
                <Stack gap={20}>
                    <Logo size={250} />
                    <Box style={{ textAlign: 'center' }}>
                        <Loader size="xl" color="primary" />
                        <p style={{ marginTop: '1rem' }}>Cargando aplicación...</p>
                    </Box>
                </Stack>
            </Center>
        </>
    );
}