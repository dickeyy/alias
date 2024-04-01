import CreateGameButton from "@/components/create-game-button";
import Footer from "@/components/footer";
import GameCodeInput from "@/components/game-code-input";
import HowToButton from "@/components/how-to-button";
import SignInButton from "@/components/signin-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            <div className="fixed top-0 flex w-full flex-row items-center justify-end gap-2 bg-background px-4 py-2">
                <ThemeSwitcher />
            </div>
            <div className="grid w-full grid-cols-2 gap-2 md:w-[75%] lg:w-[55%]">
                <div className="col-span-2 flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20">
                    <h1 className="text-4xl font-bold">
                        Welcome to <span className="text-primary">Alias</span>
                    </h1>
                </div>
                <div className="col-span-2 flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-1">
                    <GameCodeInput />
                </div>
                <div className="col-span-2 flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20 sm:col-span-1">
                    <CreateGameButton />
                </div>
                <div className="col-span-2 flex w-full flex-row items-center justify-center gap-2 rounded-md border bg-secondary p-3 dark:bg-secondary/20">
                    <HowToButton />
                </div>
                <SignInButton />
            </div>

            <Footer />
        </main>
    );
}
