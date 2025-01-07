'use client';

import '../styles/globals.css';
import { SidebarProvider } from '../components/ui/sidebar';
import { ThemeProvider } from '../components/theme-provider';
import { ThemeToggle } from '@/../../components/theme-toggle';
import Header from '@/app/components/Header';
import dynamic from 'next/dynamic';

// Dynamically import KeycloakProvider with SSR disabled
const KeycloakProvider = dynamic(() => import('../keycloak').then((mod) => mod.KeycloakProvider), {
  ssr: false,
});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body>
      <KeycloakProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex flex-col flex-grow">
              <header className="border-b">
                <div className="w-full flex justify-end items-center py-4 px-4">
                  <div className="flex items-center space-x-4">
                    <Header />
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              <main className="flex-grow">{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </KeycloakProvider>
      </body>
      </html>
  );
}
