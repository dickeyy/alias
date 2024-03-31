/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Waiting({ id }: { id: string }) {
    return (
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-6 md:w-2/3">
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
                        className="cursor-pointer text-5xl font-bold transition-all duration-200 ease-in-out hover:opacity-60"
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
                    <span className="font-semibold text-primary/80">8</span> Players
                </p>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-2">
                <p className="text-lg font-normal text-muted-foreground ">
                    <span className="font-semibold text-primary/80">8</span> Aliases
                </p>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-2">
                <p className="text-lg font-normal text-muted-foreground ">
                    Round <span className="font-semibold text-primary/80">3</span>
                </p>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-6">
                <Input placeholder="Enter your alias" className="h-14 bg-background text-lg" />
                <Button className="h-14 px-8">Enter</Button>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-3">
                <Button className="h-12 w-full" variant={"destructive"}>
                    Close Lobby
                </Button>
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-3">
                <Button className="h-12 w-full bg-green-600 hover:bg-green-700" variant={"default"}>
                    Start Game
                </Button>
            </div>
        </div>
    );
}
