import Playing from "@/components/playing";
import Waiting from "@/components/waiting";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            {/* <Waiting id={params.id} /> */}
            <Playing />
        </main>
    );
}
