import React from "react"
import Button from "../button"

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

                    <Button
                        variant="primary"
                        color="red"
                        text='Back to Lobby'
                        textColor="slate"
                        className={`
                            h-16
                            text-xl
                            w-[50%]
                            font-medium
                            ml-1
                        `}
                        onClick={() => {
                            props.backToLobby()
                        }}
                        isDisabled={!props.isHost}
                    />

                </div>
            </div>
        </div>
    )

}