// app/providers.js
"use client";
import posthog from "posthog-js";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster richColors position="top-right" />
        </ThemeProvider>
    );
}
