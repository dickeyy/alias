import React from "react"
import Button from "../button"
import Footer from "../footer"

export default function PlayingScreen(props: any) {

    return (
        <div className="items-center justify-center flex flex-col">
            <p
                className='
                    text-3xl
                    font-bold
                    text-white
                    text-center
                    opacity-20
                    mb-5
                '
            >
                Click on an alias to remove it
            </p>
            <div
                className='
                    grid grid-cols-2 grid-flow-row gap-10
                    justify-center
                    items-center
                    max-w-[90%]
                    w-[90%]
                    text-center
                '
            >
                
                <div
                    className='
                        col-span-2
                        rounded-xl
                        p-5
                    '
                >
                    <div className={`items-center justify-center flex flex-wrap`}>

                        {props.gameData.aliases ? (
                            <>
                                {Object.values(props.gameData.aliases).map((obj: any) => {
                                    return (
                                        <>
                                            {obj.isEliminated ? (
                                                <div
                                                    className='
                                                        flex flex-col
                                                        bg-red-500 bg-opacity-[20%]
                                                        text-red-300
                                                        rounded-xl
                                                        line-through
                                                        p-5
                                                        justify-center
                                                        items-center
                                                        m-5
                                                        cursor-pointer
                                                    '
                                                    id={obj.id}
                                                    onClick={() => {
                                                        if (props.isHost) {
                                                            props.onEliminatePlayer(obj.id)
                                                        }
                                                    }}
                                                >
                                                    <h1 className="text-8xl font-bold text-center">
                                                        {obj.name}
                                                    </h1>
                                                </div>
                                            ) : (
                                                <div
                                                    className='
                                                        flex flex-col
                                                        bg-white bg-opacity-[8%]
                                                        rounded-xl
                                                        p-5
                                                        justify-center
                                                        items-center
                                                        m-5
                                                        cursor-pointer
                                                        hover:bg-red-500 hover:bg-opacity-[20%]
                                                    '
                                                    id={obj.id}
                                                    onClick={() => {
                                                        if (props.isHost) {
                                                            props.onEliminatePlayer(obj.id)
                                                        }
                                                    }}
                                                >
                                                    <h1 className="text-8xl font-bold text-center">
                                                        {obj.name}
                                                    </h1>
                                                </div>
                                            )}
                                        </>
                                        
                                    )
                                })}
                            </>
                        ) : (
                            null
                        )}

                    </div>
                </div>

                <div
                    className='
                        col-span-2
                        rounded-xl
                        justify-center
                        items-center
                        text-center
                        p-5
                    '
                >
                    {!props.isHost ? (
                        <button 
                            className={`
                                h-16
                                text-xl
                                w-[50%]
                                font-medium
                                ml-1
                                bg-red-700
                                text-slate-100
                                opacity-40
                                transition
                                duration-200
                                ease-in-out
                                rounded-xl
                                cursor-not-allowed
                                px-4
                                py-2
                            `} 
                            disabled
                            aria-aria-disabled
                        >
                            Back to Lobby
                        </button>
                    ) : (
                        <button 
                            className={`
                                h-16
                                text-xl
                                w-[50%]
                                font-medium
                                ml-1
                                bg-red-700
                                text-slate-100
                                hover:bg-opacity-80
                                transition
                                duration-200
                                ease-in-out
                                rounded-xl
                                px-4
                                py-2
                            `} 
                            onClick={() => {
                                props.backToLobby()
                            }}
                        >
                            Back to Lobby
                        </button>
                    )}

                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )

}