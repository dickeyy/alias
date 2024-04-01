// app/providers.js
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
    });
}
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PostHogProvider client={posthog}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster richColors position="top-right" />
            </ThemeProvider>
        </PostHogProvider>
    );
}
