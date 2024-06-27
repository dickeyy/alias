import type { Metadata } from "next";
import { Rubik as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans"
});

export const metadata: Metadata = {
    title: "Play Alias",
    description: "Play Alias online with friends!",
    icons: [
        {
            rel: "icon",
            url: "https://kyle.so/favicon.ico"
        }
    ]
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
