"use client";

import { ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GameCodeInput() {
    const router = useRouter();
    const [code, setCode] = useState("");

    return (
        <div className="group flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
            <Input
                placeholder="Enter a game code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 group-focus-visible:ring-0"
            />
            <div
                className="cursor-pointer text-muted-foreground hover:text-primary"
                onClick={() => {
                    router.push(`/game/${code}`);
                }}
            >
                <ArrowRight />
            </div>
        </div>
    );
}
