import Image from "next/image";

export default function QRModal(props:any) {
    return (
        <dialog id="qr_modal" className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box w-full shadow-sm shadow-black border border-gray-700">
                <h3 className="font-bold text-2xl">Scan to join</h3>


                <Image alt="QR Code" src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://alias.dickey.gg/game/${props.id}&bgcolor=011D28&color=FFFFFF&format=png`} width={250} height={250} />
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}