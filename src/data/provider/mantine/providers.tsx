import { MantineProvider, Overlay } from '@mantine/core';
import { theme } from "@/presentation/styles/theme";
import { Suspense } from 'react';
import { Notifications } from '@mantine/notifications';


export interface Props {
  children: React.ReactNode;
}


export default function Providers({ children }: Props) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position='top-center' autoClose={4000} />
      <Suspense fallback={<Overlay color="#000" backgroundOpacity={0.35} blur={15} />}>
        {children}
      </Suspense>
    </MantineProvider>
  );
}