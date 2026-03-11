"use client";

import { Authenticated, useMutation, useQuery } from "convex/react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Lobby({ id }: { id: string }) {
    const game = useQuery(api.games.getGame, { code: id });
    const user = authClient.useSession();
    const addAlias = useMutation(api.games.addAlias);
    const updateGameState = useMutation(api.games.updateGameState);
    const [alias, setAlias] = useState("");
    if (!game) return null;

    const joinUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/game/${game.code}`
            : "";

    const isHost = user.data?.user?.id === game.hostId;

    return (
        <>
            <style>{`
                @keyframes fadeSlideUp {
                    0%   { transform: translateY(16px); opacity: 0; }
                    100% { transform: translateY(0);    opacity: 1; }
                }
            `}</style>

            <div className="flex min-h-svh flex-col">
                <header className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
                    <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                        <Link
                            href="/"
                            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ChevronLeft className="size-5" />
                        </Link>
                        <span className="text-sm font-semibold text-primary sm:text-base">
                            Alias
                        </span>
                        <span className="font-mono text-sm tracking-widest text-muted-foreground sm:text-base">
                            · {id}
                        </span>
                        <span className="font-mono text-sm tracking-widest text-muted-foreground sm:text-base">
                            · Round {game.round}
                        </span>
                    </div>
                    <span className="shrink-0 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 font-mono text-sm font-semibold text-yellow-500">
                        {game.aliases.length} Aliases
                    </span>
                </header>

                <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-5 px-8 pb-10 mt-10">
                    {/* Title */}
                    <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>
                        <h1 className="text-4xl font-black tracking-tight">
                            Waiting to start
                        </h1>
                        <p className="mt-1 text-base text-muted-foreground">
                            Everyone enter your alias below, then the host
                            starts the game.
                        </p>
                    </div>

                    {/* QR + game code */}
                    <div
                        className="grid gap-3 sm:grid-cols-2"
                        style={{ animation: "fadeSlideUp 0.5s ease 0.1s both" }}
                    >
                        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-8">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                                Scan to join
                            </p>
                            {joinUrl ? (
                                <QRCodeSVG
                                    value={joinUrl}
                                    size={250}
                                    bgColor="transparent"
                                    fgColor="white"
                                    level="M"
                                />
                            ) : (
                                <div className="size-[160px] rounded bg-muted" />
                            )}
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-yellow-500/30 bg-card p-8 text-center">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">
                                Game code
                            </p>
                            <span className="font-mono text-6xl font-black tracking-widest text-yellow-400 sm:text-5xl md:text-6xl">
                                {game.code}
                            </span>
                            <p className="text-sm text-muted-foreground">
                                Go to{" "}
                                <span className="font-medium text-primary">
                                    {typeof window !== "undefined"
                                        ? window.location.host
                                        : "alias.kyle.so"}
                                </span>{" "}
                                and enter this code
                            </p>
                        </div>
                    </div>

                    {/* Alias input */}
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const trimmed = alias.trim();
                            if (!trimmed) return;
                            await addAlias({ code: game.code, alias: trimmed });
                            setAlias("");
                            toast.success("Done! Your alias has been added.");
                        }}
                        className="flex gap-3"
                        style={{ animation: "fadeSlideUp 0.5s ease 0.2s both" }}
                    >
                        <Input
                            placeholder="Enter your alias"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            className="h-14 px-5 text-lg"
                            autoComplete="off"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!alias.trim()}
                            className="h-14 w-14 shrink-0"
                        >
                            <ArrowRight className="size-5" />
                        </Button>
                    </form>

                    {/* Host actions */}
                    <Authenticated>
                        {isHost && (
                            <div
                                className="mt-auto grid gap-3 sm:grid-cols-2"
                                style={{
                                    animation:
                                        "fadeSlideUp 0.5s ease 0.3s both",
                                }}
                            >
                                <Button
                                    variant="outline"
                                    size="lg"
                                    asChild
                                    className="h-14 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() =>
                                        updateGameState({
                                            code: id,
                                            state: "inactive",
                                        })
                                    }
                                >
                                    <Link href="/">Close lobby</Link>
                                </Button>
                                <Button
                                    size="lg"
                                    disabled={game.aliases.length < 2}
                                    className="h-14 text-base"
                                    onClick={() =>
                                        updateGameState({
                                            code: id,
                                            state: "active",
                                        })
                                    }
                                >
                                    Start round
                                </Button>
                            </div>
                        )}
                        {!isHost && game.aliases.length < 2 && (
                            <p className="mt-2 text-center text-sm text-muted-foreground">
                                At least 2 aliases are required to start
                            </p>
                        )}
                    </Authenticated>
                </main>
            </div>
        </>
    );
}
