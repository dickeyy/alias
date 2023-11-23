import { useEffect, useState } from "react";
import Image from "next/image";
import supabase from "@/lib/supabase";


export default function GoogleLoginButton() {

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const signin = async () => {

        setIsDisabled(true)
        setIsLoading(true)

        supabase.auth.signInWithOAuth({
            provider: "google"
        })

    }

    return (
        <button className="btn btn-block btn-md btn-ghost"
            onClick={() => signin()}
            disabled={isDisabled}
        >   
            {isLoading ? (
                <div className="loading loading-spinner loading-md" ></div>
            ) : (
                <Image src="/images/webp/google-logo.webp" alt="Google Logo" className="mr-2" width={15} height={15} />
            )}

            <p className="normal-case">Sign in with Google</p>
        </button>
    )
}