import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Header from "@/components/partials/Header";
import { BreadCrumb } from "@/components/common/bread-crumb-navigation";
import { ErrorBoundary } from "@/components/common/error-boundary";

export const metadata: Metadata = {
    title: "Admin | Yeti Homes",
    description: "Admin panel for Yeti Homes Real Estate",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full p-2 overflow-hidden relative">
                <Header />
                <BreadCrumb />
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </main>
        </SidebarProvider>
    );
}