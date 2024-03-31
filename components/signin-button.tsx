"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import useAuthStore from "@/stores/auth-store";
import { toast } from "sonner";

export default function SignInButton() {
    const { isSignedIn } = useAuthStore();

    const signIn = async () => {
        // TODO
        toast.warning("This feature is not implemented yet.");
    };

    return (
        <>
            {!isSignedIn && (
                <div className="col-span-2 flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20">
                    <Button className="h-12 w-full gap-2" variant={"outline"} onClick={signIn}>
                        <Image
                            src="/images/google-logo.webp"
                            alt="Google Logo"
                            width={18}
                            height={18}
                        />
                        Sign in with Google
                    </Button>
                </div>
            )}
        </>
    );
}
