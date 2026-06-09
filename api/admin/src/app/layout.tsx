import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles/globals.css";
import { Providers } from '@/components/provider/provider';

const popins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
})

export const metadata: Metadata = {
    manifest: '/site.mebmanifest',
    title: "Admin Panel",
    description: "Admin panel for CMS Platform",
    robots: {
        index: false,
        follow: false
    }
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${popins.className} antialiased`}>
                <main>
                    <Providers>
                        {children}
                    </Providers>
                </main>
            </body>
        </html>
    );
}