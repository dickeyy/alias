"use client";

import { VolumeXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import ReactConfetti from "react-confetti";
import { supabase } from "@/lib/supabase";

export default function Playing({
    id,
    isOwner,
    game
}: {
    id: string;
    isOwner: boolean;
    game: any;
}) {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [outAliases, setOutAliases] = useState<string[]>([]); // an array of alias ids
    const [aliases, setAliases] = useState<any[]>([]);
    const [winner, setWinner] = useState<string | null>(null);

    // set aliases and outAliases
    useEffect(() => {
        if (game?.aliases) {
            setAliases(game.aliases);
        }
        if (game?.out_aliases) {
            setOutAliases(game.out_aliases);
        }
    }, [game]);

    // timer
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 59) {
                    setMinutes((prevMinutes) => prevMinutes + 1);
                    return 0;
                }
                return prevSeconds + 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // determine the winner
    useEffect(() => {
        if (outAliases.length === aliases.length - 1) {
            const winner = aliases.find((alias) => !outAliases.includes(JSON.parse(alias).id));
            setWinner(JSON.parse(winner).id);
        } else {
            setWinner(null);
        }
    }, [outAliases, winner, aliases]);

    // function to add or remove an alias from the outAliases array
    const outAlias = async (alias: any) => {
        // first check if the alias is already in the outAliases array
        if (outAliases?.includes(alias.id)) {
            // remove the alias from the outAliases array in supabase
            const { error } = await supabase
                .from("games")
                .update({
                    out_aliases: outAliases?.filter((item: any) => item !== alias.id)
                })
                .eq("code", game.code);

            if (error) {
                toast.error(error.message);
                return;
            }

            return;
        } else {
            // if it isn't, add it to the outAliases array
            // add the alias to the outAliases array in supabase
            const { error } = await supabase
                .from("games")
                .update({
                    out_aliases: [...outAliases, alias.id]
                })
                .eq("code", game.code);

            if (error) {
                toast.error(error.message);
                return;
            }

            return;
        }
    };

    return (
        <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="fixed top-2 flex w-full flex-row items-center justify-between px-4 text-muted-foreground">
                <p className="w-20 text-lg font-medium">{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
                {isOwner && (
                    <p className="text-lg font-semibold ">Click on an Alias to remove it</p>
                )}
                <VolumeXIcon className="h-6 w-6 cursor-pointer" />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-4 pt-8">
                {aliases.map((alias) => {
                    const parsed = JSON.parse(alias);
                    const isOut = outAliases?.includes(parsed.id);
                    const isWinner = winner === parsed.id;
                    return (
                        <div
                            key={parsed.id}
                            className={`flex w-full cursor-pointer justify-center rounded-md border bg-secondary/40 p-3 text-6xl font-bold shadow-sm transition-all duration-200 ease-in-out md:w-fit 
                            ${isOut ? "text-red-500  opacity-10 hover:opacity-15" : "opacity-100 hover:opacity-65"}
                            ${isWinner ? "text-green-600" : ""}
                        `}
                            onClick={() => {
                                if (isOwner) outAlias(parsed);
                            }}
                        >
                            {parsed.alias}
                        </div>
                    );
                })}
            </div>

            {winner && (
                <ReactConfetti
                    aria-disabled
                    recycle={true}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={200}
                    gravity={0.05}
                />
            )}

            {isOwner && (
                <Button
                    className="mt-8 h-12 w-full gap-2"
                    variant={"ghost"}
                    onClick={async () => {
                        await backToLobby(game);
                    }}
                >
                    Back to Lobby
                </Button>
            )}
        </div>
    );
}

async function backToLobby(game: any) {
    const { error } = await supabase
        .from("games")
        .update({
            started: false,
            aliases: [],
            active: true,
            round: game.round + 1,
            out_aliases: []
        })
        .eq("code", game.code);

    if (error) {
        toast.error(error.message);
        return false;
    } else {
        return true;
    }
}
