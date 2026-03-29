"use client";

import { useMutation, useQuery } from "convex/react";
import type { Infer } from "convex/values";
import { api } from "@/convex/_generated/api";
import type { aliasSchema } from "@/convex/schema";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function Active({ id }: { id: string }) {
    const game = useQuery(api.games.getGame, { code: id });
    const user = authClient.useSession();
    const eliminateAlias = useMutation(api.games.toggleAliasEliminated);
    if (!game) return null;

    const isHost = user.data?.user?.id === game.hostId;
    const remaining = game.aliases.filter((a) => !a.eliminated).length;
    const total = game.aliases.length;

    return (
        <>
            <style>{`
                @keyframes cardIn {
                    0%   { transform: translateY(20px) scale(0.95); opacity: 0; }
                    60%  { transform: translateY(-3px) scale(1.02); }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }
            `}</style>

            <div className="flex min-h-svh flex-col">
                <header className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
                    <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold text-primary sm:text-base">
                            Alias
                        </span>
                        <span className="font-mono text-sm tracking-widest text-muted-foreground sm:text-base">
                            · {id}
                        </span>
                    </div>
                    <span className="shrink-0 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 font-mono text-sm font-semibold text-yellow-500">
                        {remaining} / {total} alive
                    </span>
                </header>

                {isHost && (
                    <div className="px-4 pb-2 text-center sm:px-8">
                        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                            Tap an alias to eliminate
                        </p>
                    </div>
                )}

                <main className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-10">
                    <div className="flex w-full max-w-screen flex-wrap items-center justify-center gap-4">
                        {game.aliases.map((alias, i) => (
                            <AliasCard
                                key={alias.id}
                                alias={alias}
                                index={i}
                                canEliminate={isHost}
                                onEliminate={() =>
                                    eliminateAlias({
                                        code: id,
                                        aliasId: alias.id,
                                    })
                                }
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

function AliasCard({
    alias,
    index,
    canEliminate,
    onEliminate,
}: {
    alias: Infer<typeof aliasSchema>;
    index: number;
    canEliminate: boolean;
    onEliminate: (id: string) => void;
}) {
    const enterDelay = `${(index * 0.07).toFixed(2)}s`;

    return (
        <button
            type="button"
            onClick={() => (canEliminate ? onEliminate(alias.id) : undefined)}
            className={cn(
                "group relative flex min-w-[130px] items-center justify-center rounded-2xl border-2 px-7 py-5 text-center",
                "transition-[border-color,background-color,transform,box-shadow] duration-150",
                alias.eliminated
                    ? "cursor-default border-border/30 bg-card/40 opacity-40"
                    : cn(
                          "border-border/30 bg-card",
                          canEliminate &&
                              "cursor-pointer hover:border-red-400/60 hover:bg-red-500/5 hover:-rotate-2 hover:scale-105 active:scale-95 active:rotate-1",
                          !canEliminate && "cursor-default",
                      ),
            )}
            style={{
                animation: `cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${enterDelay} both`,
            }}
        >
            <span
                className={cn(
                    "relative text-xl font-bold leading-snug",
                    alias.eliminated && "line-through opacity-60",
                )}
            >
                {alias.name}
            </span>
        </button>
    );
}
