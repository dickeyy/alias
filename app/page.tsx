"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthButtons } from "@/components/auth-buttons";
import Footer from "@/components/footer";
import CreateGameButton from "@/components/game/create-game-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HOW_TO_PLAY_STEPS = [
    {
        n: 1,
        text: "Gather at least 4 people. The more, the better.",
    },
    {
        n: 2,
        text: "One person creates the game (sign-in required for the host only) and shares the game code or QR code with everyone else.",
    },
    {
        n: 3,
        text: "No phone? No problem. Players can share a single device — you don't need to join individually.",
    },
    {
        n: 4,
        text: "Each player thinks of an alias: a fake name of a famous person, fictional character, or someone everyone in the group knows. Make it hard to guess — think outside the box!",
    },
    {
        n: 5,
        text: "Enter your alias into the text box and submit. Aliases are not tied to your device or account, so sharing a phone is totally fine.",
    },
    {
        n: 6,
        text: "Once every player has submitted an alias, the host starts the game.",
    },
    {
        n: 7,
        text: 'Players take turns guessing who is behind each alias. For example: "Kyle, are you John Stamos?" — if correct, that player is out and the guesser keeps going.',
    },
    {
        n: 8,
        text: "The last person whose alias hasn't been guessed wins.",
    },
];

export default function Home() {
    const [gameCode, setGameCode] = useState("");
    const router = useRouter();

    const handleJoinGame = (e: React.FormEvent) => {
        e.preventDefault();
        if (gameCode.trim()) {
            router.push(`/game/${gameCode.trim()}`);
        }
    };

    return (
        <>
            <style>{`
                @keyframes fadeSlideUp {
                    0%   { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0);    opacity: 1; }
                }
            `}</style>

            <div className="flex min-h-svh flex-col">
                <main className="flex flex-1 flex-col items-center px-6 py-16 sm:py-24">
                    <div className="flex w-full max-w-xl flex-col gap-14">
                        {/* Hero */}
                        <section
                            className="flex flex-col gap-3"
                            style={{ animation: "fadeSlideUp 0.55s ease both" }}
                        >
                            <h1 className="text-6xl font-black tracking-tight text-yellow-400 sm:text-7xl">
                                Alias
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                A party game about fake names and wrong guesses.
                            </p>
                        </section>

                        {/* Join / Create */}
                        <section
                            className="flex flex-col gap-3"
                            style={{
                                animation: "fadeSlideUp 0.55s ease 0.1s both",
                            }}
                        >
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                                Join a game
                            </p>
                            <form
                                onSubmit={handleJoinGame}
                                className="flex gap-2"
                            >
                                <Input
                                    placeholder="Enter game code"
                                    value={gameCode}
                                    onChange={(e) =>
                                        setGameCode(
                                            e.target.value.toUpperCase(),
                                        )
                                    }
                                    className="h-14 px-5 font-mono text-lg tracking-widest"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!gameCode.trim()}
                                    className="h-14 w-14 shrink-0"
                                >
                                    <ArrowRight className="size-5" />
                                </Button>
                            </form>

                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-border" />
                                <span className="text-xs text-muted-foreground">
                                    or
                                </span>
                                <div className="h-px flex-1 bg-border" />
                            </div>

                            <Authenticated>
                                <CreateGameButton />
                            </Authenticated>
                            <Unauthenticated>
                                <AuthButtons />
                                <p className="text-center text-xs text-muted-foreground">
                                    Sign in to create a game
                                </p>
                            </Unauthenticated>
                        </section>

                        {/* How to play */}
                        <section
                            className="flex flex-col gap-6"
                            style={{
                                animation: "fadeSlideUp 0.55s ease 0.2s both",
                            }}
                        >
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                                How to play
                            </h2>
                            <ol className="flex flex-col gap-5">
                                {HOW_TO_PLAY_STEPS.map(({ n, text }) => (
                                    <li
                                        key={n}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-yellow-500/40 bg-yellow-500/10 text-xs font-bold text-yellow-500">
                                            {n}
                                        </span>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {text}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
