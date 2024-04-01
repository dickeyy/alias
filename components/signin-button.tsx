"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import useUserStore from "@/stores/user-store";

export default function SignInButton() {
    const { user } = useUserStore();

    const signIn = async () => {
        supabase.auth
            .signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: window?.location?.origin || "https://alias.dickey.gg"
                }
            })
            .then((response) => {
                if (response.error) {
                    toast.error(response.error.message);
                } else {
                    toast.success("Signed in successfully");
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const signOut = async () => {
        supabase.auth
            .signOut()
            .then((response) => {
                if (response.error) {
                    toast.error(response.error.message);
                } else {
                    toast.success("Signed out successfully");
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <div className="col-span-2 flex w-full flex-col items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20">
            {user.id && (
                <p className="text-md font-normal text-muted-foreground">👋 {user.email}</p>
            )}
            {!user.id ? (
                <Button className="h-12 w-full gap-2" variant={"outline"} onClick={signIn}>
                    <Image
                        src="/images/google-logo.webp"
                        alt="Google Logo"
                        width={18}
                        height={18}
                    />
                    Sign in with Google
                </Button>
            ) : (
                <Button className="h-12 w-full gap-2" variant={"outline"} onClick={signOut}>
                    Sign out
                </Button>
            )}
        </div>
    );
}
