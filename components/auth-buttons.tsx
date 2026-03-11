"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export function AuthButtons() {
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({ provider: "google" });
    };
    return (
        <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleSignIn}
        >
            <Image src="/google.png" alt="Google" width={16} height={16} />
            Sign in with Google
        </Button>
    );
}
