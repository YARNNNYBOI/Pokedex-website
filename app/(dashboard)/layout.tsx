import { Geist, Geist_Mono } from "next/font/google"

import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Providers from "../provider";
import { SidebarProvider, SidebarInset, SidebarHeader } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";


const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SidebarHeader>
                  <SiteHeader />
                </SidebarHeader>
                {children}
              </SidebarInset>
            </SidebarProvider>
  );
}
