import GameCodeInput from "@/components/game-code-input";
import SignInButton from "@/components/signin-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            <div className="grid w-full grid-flow-row grid-cols-2 gap-2 sm:w-[55%]">
                <div className="col-span-2 flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20">
                    <ThemeSwitcher />
                    <h1 className="text-4xl font-bold">
                        Welcome to <span className="text-primary">Alias</span>
                    </h1>
                </div>
                <div className="col-span-1 flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20">
                    <GameCodeInput />
                </div>
                <div className="col-span-1 flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20">
                    <Button disabled className="h-12 w-full">
                        Create a game
                    </Button>
                </div>
                <div className="col-span-2 flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20">
                    <Button className="h-12 w-full gap-2" variant={"outline"}>
                        How to play Alias
                    </Button>
                </div>
                <SignInButton />
            </div>
        </main>
    );
}
