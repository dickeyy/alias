/* eslint-disable @next/next/no-img-element */
"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import useUserStore from "@/stores/user-store";
import AliasAddedModal from "./alias-added-modal";
import { nanoid } from "nanoid";

export default function Waiting({
    id,
    game,
    isOwner
}: {
    id: string;
    game: any;
    isOwner: boolean;
}) {
    const { user } = useUserStore();
    const [enteredAlias, setEnteredAlias] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (game?.code !== undefined) {
            if (user?.id !== undefined) {
                joinGame(game.code, user);
            }
        }
    });

    return (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:w-full sm:grid-cols-6 md:w-3/4 lg:w-2/3">
            <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-6">
                <h1 className="text-4xl font-bold">Waiting to start</h1>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-3">
                <p className="text-lg font-medium text-muted-foreground">Scan to Join</p>
                <div
                    className="rounded-lg border p-2 transition-all duration-200 ease-in-out"
                    id="qr_container"
                >
                    <img
                        alt="QR Code to join the game"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x2000&data=https://alias.dickey.gg/game/${id}&bgcolor=130f0e&color=FFFFFF&format=png`}
                        className="aspect-square h-auto w-full cursor-pointer rounded-md transition-all duration-200 ease-in-out hover:opacity-60"
                        id="qr_code"
                        onClick={() => {
                            if (
                                document
                                    .getElementById("qr_container")
                                    ?.classList.contains("blur-md")
                            ) {
                                // if the qr code is blurred, remove the blur
                                document
                                    .getElementById("qr_container")
                                    ?.classList.remove("filter", "blur-md");
                            } else {
                                // if the qr code is not blurred, add the blur
                                document
                                    .getElementById("qr_container")
                                    ?.classList.add("filter", "blur-md");
                            }
                        }}
                    />
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-3">
                <p className="text-lg font-medium text-muted-foreground">Game Code</p>
                <div
                    id="code_container"
                    className="flex items-center justify-center gap-2 transition-all duration-200 ease-in-out"
                >
                    <p
                        className="cursor-pointer text-6xl font-bold transition-all duration-200 ease-in-out hover:opacity-60"
                        onClick={() => {
                            if (
                                document
                                    .getElementById("code_container")
                                    ?.classList.contains("blur-md")
                            ) {
                                // if the qr code is blurred, remove the blur
                                document
                                    .getElementById("code_container")
                                    ?.classList.remove("filter", "blur-md");
                            } else {
                                // if the qr code is not blurred, add the blur
                                document
                                    .getElementById("code_container")
                                    ?.classList.add("filter", "blur-md");
                            }
                        }}
                    >
                        {id}
                    </p>
                </div>
                <p className="text-md text-muted-foreground">
                    Go to <span className="font-semibold text-primary/80">alias.dickey.gg</span> to
                    join
                </p>
            </div>
            <div
                id="player_container"
                className="flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 transition-all duration-200 ease-in-out dark:bg-secondary/20 sm:col-span-2"
                onClick={() => {
                    if (
                        document.getElementById("player_container")?.classList.contains("blur-md")
                    ) {
                        // if the qr code is blurred, remove the blur
                        document
                            .getElementById("player_container")
                            ?.classList.remove("filter", "blur-md");
                    } else {
                        // if the qr code is not blurred, add the blur
                        document
                            .getElementById("player_container")
                            ?.classList.add("filter", "blur-md");
                    }
                }}
            >
                <p className="text-lg font-normal text-muted-foreground ">
                    <span className="font-semibold text-primary/80">{game?.players?.length}</span>{" "}
                    Player{game?.players?.length === 1 ? "" : "s"}
                </p>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-2">
                <p className="text-lg font-normal text-muted-foreground ">
                    <span className="font-semibold text-primary/80">{game?.aliases?.length}</span>{" "}
                    Alia{game?.aliases?.length === 1 ? "s" : "ses"}
                </p>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-2">
                <p className="text-lg font-normal text-muted-foreground ">
                    Round <span className="font-semibold text-primary/80">{game?.round}</span>
                </p>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-6">
                <form
                    className="flex w-full flex-row items-center justify-center gap-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (enteredAlias.trim() === "") {
                            toast.error("Alias cannot be empty");
                            return;
                        }

                        const success = await enterAlias(game, enteredAlias.trim());
                        if (success) {
                            setEnteredAlias("");
                            toast.success("Alias added successfully");
                            setIsModalOpen(true);
                        } else {
                            toast.error("Something went wrong. Please try again.");
                        }
                    }}
                >
                    <Input
                        placeholder="Enter your alias"
                        className="h-14 bg-background text-lg"
                        value={enteredAlias}
                        onChange={(e) => {
                            setEnteredAlias(e.target.value);
                        }}
                    />
                    <Button className="h-14 px-8">Enter</Button>
                </form>
            </div>

            {isOwner && (
                <>
                    <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-3">
                        <Button
                            className="h-12 w-full"
                            variant={"destructive"}
                            onClick={async () => {
                                await endGame(game);
                                toast.info("Game ended");
                            }}
                        >
                            Close Lobby
                        </Button>
                    </div>
                    <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-3">
                        <Button
                            className="h-12 w-full bg-green-600 hover:bg-green-700"
                            variant={"default"}
                            onClick={async () => {
                                await startGame(game);
                                toast.info("Game started");
                            }}
                        >
                            Start Game
                        </Button>
                    </div>
                </>
            )}

            {/* modal to let player know very clearly that their alias was added */}
            <AliasAddedModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>
    );
}

async function enterAlias(game: any, alias: string) {
    if (alias.length > 0) {
        // generate a random long alphanumeric string\
        const id = nanoid(6);
        const { error } = await supabase
            .from("games")
            .update({
                aliases: [
                    ...game.aliases,
                    {
                        id: id,
                        alias: alias
                    }
                ]
            })
            .eq("id", game.id);

        if (error) {
            toast.error(error.message);
            return false;
        } else {
            return true;
        }
    }
}

async function joinGame(gameCode: string, user?: any) {
    // this will run on page load for every user
    // first check if there is a user
    if (user?.id !== undefined) {
        if (user?.id !== null) {
            if (user !== undefined && user !== null) {
                // first fetch the game
                const { data, error } = await supabase
                    .from("games")
                    .select("*")
                    .eq("code", gameCode)
                    .single();

                if (error) {
                    toast.error(error.message);
                }

                // if there is a game
                if (data) {
                    // check if the user is not already in the game
                    if (!data.players.includes(user.id)) {
                        // if they aren't, add them to the game
                        const { error } = await supabase
                            .from("games")
                            .update({
                                players: [...data.players, user.id]
                            })
                            .eq("code", gameCode);

                        if (error) {
                            toast.error(error.message);
                        }
                    }
                }
            }
        }
    }
}

async function startGame(game: any) {
    const { error } = await supabase
        .from("games")
        .update({
            started: true
        })
        .eq("id", game.id);

    if (error) {
        toast.error(error.message);
        return false;
    } else {
        return true;
    }
}

async function endGame(game: any) {
    const { error } = await supabase
        .from("games")
        .update({
            active: false,
            code: -1
        })
        .eq("id", game.id);

    if (error) {
        toast.error(error.message);
        return false;
    } else {
        return true;
    }
}
