import Image from "next/image";
import Confetti from "react-confetti";

export default function WinnerModal(props:any) {

    // set the height of the confetti to the height of the screen
    const height = window.innerHeight
    const width = window.innerWidth

    return (
        <dialog id="winner_modal" className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box w-full shadow-sm shadow-black border border-gray-700">
                <h1 className="font-bold text-4xl text-center">🎉 <span className="text-primary">{props.winner}</span> wins!</h1>
                
                {props.isOwner ? (
                    <button className="btn btn-primary btn-block btn-md mt-10" onClick={() => { props.backToLobby(props.game) }}>Back to Lobby</button>
                ) : (
                    <p className="text-center text-sm text-gray-400 mt-4">Waiting for the host to go back to the lobby...</p>
                )}
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            <Confetti
                width={width}
                height={height}
                numberOfPieces={200}
                
            />
        </dialog>
    )
}