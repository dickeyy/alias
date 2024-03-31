"use client";

import useUserStore from "@/stores/user-store";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateGameButton() {
    const router = useRouter();
    const { user } = useUserStore();

    return (
        <Button
            disabled={user?.id ? false : true}
            className="h-12 w-full"
            onClick={() => createGame(user, router)}
        >
            Create a game
        </Button>
    );
}

async function createGame(user: any, router: any) {
    // make a 6 digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const { error } = await supabase.from("games").insert({
        created_at: (new Date().getTime() / 1000).toFixed(0),
        players: [user.id],
        owner_id: user.id,
        code: code,
        started: false,
        active: true,
        round: 1,
        aliases: [],
        out_aliases: []
    });

    if (error) {
        toast.error(error.message);
    } else {
        router.push(`/game/${code}`);
    }
}
