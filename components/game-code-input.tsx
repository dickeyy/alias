import { ArrowRight } from "lucide-react";
import { Input } from "./ui/input";

export default function GameCodeInput() {
    return (
        <div className="group flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
            <Input
                placeholder="Enter a game code"
                className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 group-focus-visible:ring-0"
            />
            <div className="cursor-pointer text-muted-foreground hover:text-primary">
                <ArrowRight />
            </div>
        </div>
    );
}
