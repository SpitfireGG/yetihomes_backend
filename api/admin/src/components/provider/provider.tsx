'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { TankStackProviders } from '@/components/provider/tankstackquery-provider';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <TankStackProviders>
                    {children}
                    <Toaster richColors position="top-center" />
                </TankStackProviders>
            </ThemeProvider>
        </Provider>
    );
}
