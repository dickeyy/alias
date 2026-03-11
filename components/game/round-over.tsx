"use client";

import { Authenticated, useMutation, useQuery } from "convex/react";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const CONFETTI_COLORS = [
    "#facc15",
    "#60a5fa",
    "#f87171",
    "#4ade80",
    "#c084fc",
    "#fb923c",
    "#34d399",
    "#f472b6",
];

function Confetti() {
    const pieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        left: `${(i * 2.6 + 1.2) % 100}%`,
        delay: `${((i * 0.13) % 2.5).toFixed(2)}s`,
        duration: `${(2.8 + (i % 5) * 0.35).toFixed(2)}s`,
        isRect: i % 3 !== 0,
        size: i % 4 === 0 ? 8 : i % 4 === 1 ? 6 : 10,
    }));

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {pieces.map((p) => (
                <div
                    key={p.id}
                    className="absolute top-0"
                    style={{
                        left: p.left,
                        width: p.isRect ? p.size : p.size,
                        height: p.isRect ? p.size * 2 : p.size,
                        backgroundColor: p.color,
                        borderRadius: p.isRect ? 2 : "50%",
                        opacity: 0.9,
                        animation: `confettiFall ${p.duration} ${p.delay} ease-in infinite`,
                    }}
                />
            ))}
        </div>
    );
}

export default function RoundOver({ id }: { id: string }) {
    const game = useQuery(api.games.getGame, { code: id });
    const user = authClient.useSession();
    const winner = game?.aliases.find((alias) => !alias.eliminated)?.name;
    const newRound = useMutation(api.games.newRound);
    const updateGameState = useMutation(api.games.updateGameState);
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setEntered(true), 80);
        return () => clearTimeout(t);
    }, []);

    if (!game) return null;

    const isHost = user.data?.user?.id === game.hostId;

    return (
        <>
            <style>{`
                @keyframes confettiFall {
                    0%   { transform: translateY(-16px) rotate(0deg);   opacity: 1; }
                    80%  { opacity: 0.8; }
                    100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
                }
                @keyframes winnerPop {
                    0%   { transform: scale(0.4) translateY(20px); opacity: 0; }
                    60%  { transform: scale(1.06) translateY(-4px); opacity: 1; }
                    80%  { transform: scale(0.97) translateY(0); }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                @keyframes fadeSlideUp {
                    0%   { transform: translateY(24px); opacity: 0; }
                    100% { transform: translateY(0);    opacity: 1; }
                }
                @keyframes trophyBounce {
                    0%, 100% { transform: translateY(0) rotate(-3deg); }
                    50%       { transform: translateY(-8px) rotate(3deg); }
                }
                .trophy-icon {
                    animation: trophyBounce 1.8s ease-in-out infinite;
                }
            `}</style>

            <div className="relative flex min-h-svh flex-col overflow-hidden">
                <Confetti />

                <header className="relative z-10 flex items-center gap-2 px-4 py-4 sm:px-8 sm:py-5">
                    <span className="text-sm font-semibold text-primary sm:text-base">
                        Alias
                    </span>
                    <span className="font-mono text-sm tracking-widest text-muted-foreground sm:text-base">
                        · {id}
                    </span>
                </header>

                <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-8 pb-10 text-center">
                    <div
                        style={{
                            opacity: entered ? 1 : 0,
                            animation: entered
                                ? "fadeSlideUp 0.55s ease 0s forwards"
                                : "none",
                        }}
                    >
                        <div className="trophy-icon inline-flex">
                            <Trophy
                                className="text-yellow-400"
                                size={56}
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            opacity: entered ? 1 : 0,
                            animation: entered
                                ? "fadeSlideUp 0.5s ease 0.1s forwards"
                                : "none",
                        }}
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-500">
                            Last alias standing
                        </p>
                    </div>

                    <div
                        style={{
                            opacity: entered ? 1 : 0,
                            animation: entered
                                ? "winnerPop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.25s forwards"
                                : "none",
                        }}
                    >
                        <h1 className="text-7xl font-black tracking-tight text-yellow-400 sm:text-9xl">
                            {winner}
                        </h1>
                    </div>

                    <div
                        style={{
                            opacity: entered ? 1 : 0,
                            animation: entered
                                ? "fadeSlideUp 0.5s ease 0.55s forwards"
                                : "none",
                        }}
                    >
                        <p className="text-lg font-medium text-muted-foreground">
                            wins the round
                        </p>
                    </div>

                    <Authenticated>
                        {isHost && (
                            <div
                                className="mt-6 flex gap-4"
                                style={{
                                    opacity: entered ? 1 : 0,
                                    animation: entered
                                        ? "fadeSlideUp 0.5s ease 0.75s forwards"
                                        : "none",
                                }}
                            >
                                <Button
                                    variant="outline"
                                    asChild
                                    size="lg"
                                    onClick={() =>
                                        updateGameState({
                                            code: id,
                                            state: "inactive",
                                        })
                                    }
                                >
                                    <Link href="/">Home</Link>
                                </Button>
                                <Button
                                    onClick={() => newRound({ code: id })}
                                    size="lg"
                                >
                                    Play again
                                </Button>
                            </div>
                        )}
                    </Authenticated>
                </main>
            </div>
        </>
    );
}
