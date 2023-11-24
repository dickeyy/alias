export default function SuccessModal(props:any) {

    return (
        <dialog id="success_modal" className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box w-full shadow-sm shadow-black border border-zinc-700">
                <h3 className="font-bold text-2xl">Alias Added!</h3>
                <p className="text-sm text-zinc-400 mt-2">{props.message}</p>

                <button className="btn btn-primary w-full mt-10">Okay</button>

            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}