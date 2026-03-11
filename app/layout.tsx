import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { getToken } from "@/lib/auth-server";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Alias - A party game about fake names and wrong guesses",
    description: "Play Alias online with friends. No phone? No problem.",
    icons: {
        icon: "https://kyle.so/favicon.ico",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const token = await getToken();
    return (
        <html lang="en" className={cn("font-sans", inter.variable)}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ConvexClientProvider initialToken={token}>
                    {children}
                    <Toaster richColors />
                </ConvexClientProvider>
            </body>
        </html>
    );
}
