"use client";

import { VolumeXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import ReactConfetti from "react-confetti";

const aliases = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "imbe",
    "jackfruit",
    "kiwi",
    "lemon",
    "mango"
];

export default function Playing() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [outAliases, setOutAliases] = useState<string[]>([]);
    const [winner, setWinner] = useState<string | null>(null);

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

    useEffect(() => {
        if (outAliases.length === aliases.length - 1) {
            setWinner(aliases.find((alias) => !outAliases.includes(alias)) || null);
        } else {
            setWinner(null);
        }
    }, [outAliases, winner]);

    return (
        <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="fixed top-2 flex w-full flex-row items-center justify-between px-4 text-muted-foreground">
                <p className="w-20 text-lg font-medium">{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
                <p className="text-lg font-semibold ">Click on an Alias to remove it</p>
                <VolumeXIcon className="h-6 w-6 cursor-pointer" />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-4 pt-8">
                {aliases.map((alias) => (
                    <div
                        key={alias}
                        className={`flex w-full cursor-pointer justify-center rounded-md border bg-secondary/40 p-3 text-6xl font-bold shadow-sm transition-all duration-200 ease-in-out md:w-fit 
                            ${outAliases.includes(alias) ? "text-red-500  opacity-10 hover:opacity-15" : "opacity-100 hover:opacity-65"}
                            ${winner === alias ? "text-green-500" : ""}
                        `}
                        onClick={() => {
                            if (outAliases.includes(alias)) {
                                setOutAliases((prevOutAliases) =>
                                    prevOutAliases.filter((outAlias) => outAlias !== alias)
                                );
                            } else {
                                setOutAliases((prevOutAliases) => [...prevOutAliases, alias]);
                            }
                        }}
                    >
                        {alias}
                    </div>
                ))}
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

            <Button className="mt-8 h-12 w-full gap-2" variant={"ghost"}>
                Back to Lobby
            </Button>
        </div>
    );
}
