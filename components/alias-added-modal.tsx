import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function AliasAddedModal({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean;
    setIsOpen: any;
}) {
    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-3xl">Alias Added!</DialogTitle>
                    <DialogDescription>
                        Your alias has been added to the game. There is nothing more you need to do.
                        Good luck!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button className="w-full" onClick={() => setIsOpen(false)}>
                        Okay!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
