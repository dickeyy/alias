import { FaGoogle } from 'react-icons/fa'
import convertToGoogle from "@/firebase/auth/convertToGoogle"

export default function GoogleButton(props: any) {
    const signInWithGoogle = () => {
        convertToGoogle()
    }
        return (
            <button
                className={`
                    ${props.className}
                    flex flex-row
                    bg-transparent
                    border-2
                    border-green-700
                    text-white
                    hover:bg-green-300
                    placeholder-zinc-500
                    hover:bg-opacity-10
                    transition
                    duration-200
                    ease-in-out
                    rounded-xl
                    px-5
                    py-3
                    outline-none
                `}
                onClick={() => {
                    signInWithGoogle()
                }}
            >
                <FaGoogle className="text-2xl mr-2" />
                Sign in with Google
            </button>
            
        )
}