"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "../ui/button";

export default function CreateGameButton() {
    const router = useRouter();
    const createGame = useMutation(api.games.createGame);

    return (
        <Button
            onClick={async () => {
                const code = await createGame();
                if (code) {
                    router.push(`/game/${code}`);
                }
            }}
            size="lg"
        >
            Create a game
        </Button>
    );
}
