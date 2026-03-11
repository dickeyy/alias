"use client";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";
import Active from "@/components/game/active";
import Lobby from "@/components/game/lobby";
import RoundOver from "@/components/game/round-over";
import { api } from "@/convex/_generated/api";

export default function GamePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const { id } = use(params);
    const game = useQuery(api.games.getGame, { code: id });
    if (game === null || game?.state === "inactive") {
        toast.error("Game is inactive");
        router.replace("/");
        return null;
    }

    if (game?.state === "active") {
        return <Active id={id} />;
    }

    if (game?.state === "round_over") {
        return <RoundOver id={id} />;
    }

    return <Lobby id={id} />;
}
