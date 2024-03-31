import { supabase } from "@/lib/supabase";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
    user: any;
    setUser: (user: any) => void;
    session: any;
    setSession: (session: any) => void;
}

const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: {},
                setUser: (user) => set({ user }),
                session: {},
                setSession: (session) => set({ session })
            }),
            {
                name: "user-storage"
            }
        )
    )
);

async function fetchUser() {
    const session = await supabase.auth.getSession();
    useUserStore.setState({
        session: session?.data?.session ?? ({} as any),
        user: session?.data?.session?.user ?? ({} as any)
    });
}

supabase.auth.onAuthStateChange((event, session) => {
    fetchUser();
});

export default useUserStore;
