import { DiscordLogoIcon, GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 flex w-full items-center justify-between px-4 py-2 text-muted-foreground">
            <p className="text-xs">
                © {new Date().getFullYear()}{" "}
                <a
                    href="https://dickey.gg"
                    target="_blank"
                    className="underline transition-all duration-150 ease-in-out hover:text-foreground"
                >
                    Kyle Dickey
                </a>
            </p>
            <div className="flex gap-2">
                <a href="https://github.com/dickeyy" target="_blank" className="text-lg">
                    <GitHubLogoIcon />
                </a>
            </div>
        </footer>
    );
}
