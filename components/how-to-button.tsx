"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import HowToModal from "./how-to-modal";

export default function HowToButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                className="h-12 w-full gap-2"
                variant={"outline"}
                onClick={() => setIsOpen(true)}
            >
                How to play Alias
            </Button>
            <HowToModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}
