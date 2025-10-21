import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import '@mantine/notifications/styles.css';
import './global.css'
import { Metadata } from "next";
import { siteConfig } from "@/presentation/config/site";
import Providers from '../data/provider/mantine/providers';
import { ColorSchemeScript } from '@mantine/core';
import LogtoProvider from '@/data/provider/logto/LogtoProvider';


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <ColorSchemeScript />
        <meta name="apple-mobile-web-app-title" content="OmniaPOS" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <LogtoProvider>
          <Providers>
            {children}
          </Providers>
        </LogtoProvider>
      </body>
    </html>
  );
}
