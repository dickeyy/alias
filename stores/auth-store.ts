import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
    isSignedIn: boolean;
    user: {
        id: string;
        username: string;
        email: string;
    } | null;
    token: string | null;
    signOut: () => void;
}

const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                isSignedIn: false,
                user: null,
                token: null,
                signOut: () => set({ isSignedIn: false, user: null, token: null })
            }),
            {
                name: "auth-storage"
            }
        )
    )
);

export default useAuthStore;
