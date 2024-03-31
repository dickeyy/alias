"use client";

import Playing from "@/components/playing";
import Waiting from "@/components/waiting";
import { supabase } from "@/lib/supabase";
import useUserStore from "@/stores/user-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

async function getGame(id: string) {
    const { data, error } = await supabase.from("games").select("*").eq("code", id).single();

    if (error) {
        toast.error(error.message);
    } else {
        return data;
    }
}

export default function Page({ params }: { params: { id: string } }) {
    const { user } = useUserStore();
    const router = useRouter();

    const [game, setGame] = useState<any>();
    const [isOwner, setIsOwner] = useState(false);

    // fetch game data
    useEffect(() => {
        const fetchGame = async () => {
            const data = await getGame(params.id);
            setGame(data);
            setIsOwner(data?.owner_id === user?.id);
        };

        fetchGame();
    }, [params.id, user?.id]);

    // check if user is owner
    useEffect(() => {
        if (user?.id === game?.owner_id) {
            setIsOwner(true);
        }
    }, [isOwner, user?.id, game?.owner_id]);

    // redirect if game is not active
    useEffect(() => {
        if (game?.active === false) {
            router.push("/");
        }
    }, [game, router]);

    // subscribe to game changes
    useEffect(() => {
        const sub = supabase
            .channel(`game:${params.id}`)
            .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
                setGame(payload.new);
            })
            .subscribe();

        return () => {
            sub.unsubscribe();
        };
    }, [params.id]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            {game?.started ? (
                <Playing id={params.id} game={game} isOwner={isOwner} />
            ) : (
                <Waiting id={params.id} game={game} isOwner={isOwner} />
            )}
        </main>
    );
}
