import { MantineProvider, Overlay } from '@mantine/core';
import { theme } from "@/presentation/styles/theme";
import { Suspense } from 'react';

export interface Props {
  children: React.ReactNode;
}


export default function Providers({ children }: Props) {
  return (
    <MantineProvider theme={theme}>
      <Suspense fallback={<Overlay color="#000" backgroundOpacity={0.35} blur={15} />}>
        {children}
      </Suspense>
    </MantineProvider>
  );
}