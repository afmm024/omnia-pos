// app/(auth)/LogtoSessionProvider.tsx
import { getLogtoContext } from '@logto/next/server-actions';
import { ReactNode } from 'react';
import LogtoService from './LogtoService';
import { LogtoSessionProvider } from '@/presentation/hooks/useLogtoSession';

interface Props {
    children: ReactNode;
}

export default async function LogtoProvider({ children }: Props) {

    const logtoService = new LogtoService();
    const context = await getLogtoContext(logtoService.configLogto);

    return (
        <LogtoSessionProvider context={context}>
            {children}
        </LogtoSessionProvider>
    );
}