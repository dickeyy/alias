import React, { useState, useEffect } from "react"

import Button from "../button"
import IconButton from "../iconButton"
import Input from "../input"
import SignedInAs from "../signedInAs"
import { FaArrowRight } from 'react-icons/fa'
import Footer from "../footer"

export default function WaitingScreen(props: any) {

    const [numOfAliases, setNumOfAliases] = useState<number>(0)

    useEffect(() => {
        if (props.gameData?.aliases) {
            setNumOfAliases(Object.keys(props.gameData?.aliases).length)
        }  
    }, [props.gameData])

    const startGame = () => {
        props.startGame()
    }

    return (
        <div className="
            items-center justify-center 
            grid 
            sm:grid-cols-2 sm:grid-flow-row sm:gap-4
            grid-cols-1 grid-flow-row gap-3
        ">

            <div
                className='
                    flex flex-col
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    h-80
                    justify-center
                    items-center
                    sm:col-span-1
                    col-span-2
                '
            >

                <div className="flex flex-col items-center justify-center">
                    <p
                        className="text-xl mb-1"
                    >
                        Game code:
                    </p>
                    <h1 className="sm:text-8xl text-6xl font-bold text-center text-green-500">
                        {props.id}
                    </h1>
                </div>

                <div className="flex flex-row items-center justify-center mt-5">
                    <h1 className="text-2xl font-bold text-center">
                        Join at <span className='text-green-700'>aliasgame.xyz</span>
                    </h1>
                </div>

            </div>

            <div
                className='
                    flex flex-col
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    h-80
                    justify-center
                    items-center
                    sm:col-span-1
                    col-span-2
                '
            >

                <div className="flex flex-col items-center justify-center">
                    <p
                        className="text-xl mb-1"
                    >
                        Scan to join:
                    </p>
                    <div className="
                        border-2 border-green-500 border-opacity-50 rounded-xl p-2"
                    >
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x2000&data=https://aliasgame.xyz/game/${props.id}&bgcolor=141414&color=FFFFFF&format=svg`}
                            className="w-60 h-60
                            rounded-lg
                            "
                        />
                    </div>
                </div>

            </div>

            <div
                className='
                    flex flex-col
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    justify-center
                    items-center
                    col-span-2
                '
            >
                
                <div className="flex flex-row items-center justify-center text-center">
                    <p
                        className="text-2xl font-medium mr-5"
                    >
                        Players: <span className="text-green-500">{props.gameData?.playerIds?.length}</span>
                    </p>

                    {/* make a text that shows the amount of aliases or show 0 */}
                    <p
                        className="text-2xl font-medium mr-5"
                    >
                        Aliases: <span className="text-green-500">{numOfAliases}</span>
                    </p>

                    <p
                        className="text-2xl font-medium mr-5"
                    >
                        Round: <span className="text-green-500">{props.gameData?.round}</span>
                    </p>

                </div>

            </div>

            <div
                className='
                    flex flex-col
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    justify-center
                    items-center
                    sm:col-span-1
                    col-span-2
                '
            >
                
                <div className="flex flex-row items-center justify-center">
                    
                <Input
                    placeholder="Enter aliases"
                    className={`
                        w-64
                        h-16
                        text-xl
                        font-medium
                    `}
                    value={props.enteredAlias}
                    onChange={(e) => props.setEnteredAlias(e.target.value)}
                />

                <IconButton
                    icon={
                        <FaArrowRight />
                    }
                    variant="outline"
                    color="green"
                    loading={false}
                    disabled={false}
                    textColor="slate"
                    className={`
                        w-16
                        h-16
                        text-xl
                        font-medium
                        ml-2
                    `}
                    onClick={() => {
                        props.onAddAlias()
                    }}
                />

                </div>

            </div>

            <div
                className='
                    flex flex-col
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    justify-center
                    items-center
                    sm:col-span-1
                    col-span-2
                '
            >
                <div className="flex flex-row items-center justify-evenly">
                    
                    {!props.isHost ? (
                        <button 
                            className={`
                                h-16
                                text-xl
                                font-medium
                                mr-2
                                bg-green-700
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
                            Start Game
                        </button>
                    ) : (
                        <button 
                            className={`
                                h-16
                                text-xl
                                font-medium
                                mr-2
                                bg-green-700
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
                                startGame()
                            }}
                        >
                            Start Game
                        </button>
                    )}

                    {!props.isHost ? (
                        <button 
                            className={`
                                h-16
                                text-xl
                                font-medium
                                mr-2
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
                            Close Lobby
                        </button>
                    ) : (
                        <button 
                            className={`
                                h-16
                                text-xl
                                font-medium
                                mr-2
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
                                props.closeLobby()
                            }}
                        >
                            Close Lobby
                        </button>
                    )}

                </div>

            </div>

            <div
                className='
                    flex flex-col
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    justify-center
                    items-center
                    col-span-2
                '
            >
                <div className="flex flex-col items-center justify-center">
                    
                    <SignedInAs user={props.user} />

                </div>

            </div>

            {/* <div className="flex flex-col
                    rounded-xl
                    p-5
                    justify-center
                    items-center
                    col-span-2
                    ">
                <Footer />
            </div> */}
        </div>
    )
}