export default function Footer() {
    return (
        <footer className="flex items-center justify-between px-6 py-2 text-xs text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} Kyle Dickey</span>
            <a
                href="https://github.com/dickeyy/alias"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
            >
                GitHub
            </a>
        </footer>
    );
}
