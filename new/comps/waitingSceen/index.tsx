import Image from 'next/image'
import useModal from '@/hooks/useModal'
import useUser from '@/hooks/useUser'
import GoogleLoginButton from '../oauthButtons/google'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import SuccessModal from '../modals/successModal'
import InstructionsModal from '../modals/instructionsModal'

async function enterAlias(game:any, alias:string) {
    if (alias.length > 0) {
        // generate a random long alphanumeric string\
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        const { error } = await supabase.from('games').update({
            aliases: [...game.aliases, {
                id: id,
                alias: alias,
            }]
        }).eq('code', game.code)

        if (error) {
            console.log(error)
            return false
        } else {
            return true
        }
    }
}

async function startGame(game:any) {
    const { error } = await supabase.from('games').update({
        started: true
    }).eq('code', game.code)

    if (error) {
        console.log(error)
        return false
    } else {
        return true
    }
}

async function endGame(game:any) {
    const { error } = await supabase.from('games').update({
        active: false
    }).eq('code', game.code)

    if (error) {
        console.log(error)
        return false
    } else {
        return true
    }
}

async function joinGame(gameCode:string, user?:any, openModal?:any) {
    // this will run on page load for every user 
    // first check if there is a user
    if (user?.id !== undefined) {
        if (user?.id !== null) {
            if (user !== undefined && user !== null) {
                // first fetch the game
                const { data, error } = await supabase.from('games').select('*').eq('code', gameCode).single()

                if (error) {
                    openModal("error")
                }

                // if there is a game
                if (data) {
                    // check if the user is not already in the game
                    if (!data.players.includes(user.id)) {
                        // if they aren't, add them to the game
                        const { error } = await supabase.from('games').update({
                            players: [...data.players, user.id]
                        }).eq('code', gameCode)

                        if (error) {
                            openModal("error")
                        }
                    }
                }
            }
        }
    }
}

export default function WaitingScreen(props:any) {

    const { game } = props
    const id = game?.code

    const { openModal } = useModal()
    const { user, isSignedIn, isAuthLoading }:any = useUser()

    const [isOwner, setIsOwner] = useState(false)
    const [alias, setAlias] = useState('')

    useEffect(() => {
        if (game?.owner_id !== undefined) {
            if (user?.id !== undefined) {
                if (user?.id === game?.owner_id) {
                    setIsOwner(true)
                }
            }
        }
    }, [user, game])

    useEffect(() => {
        if (game?.code !== undefined) {
            if (isSignedIn) {
                joinGame(game.code, user, openModal)
            }
        }
    })

	return (
        <div className='grid grid-cols-6 sm:gap-4 gap-2 lg:w-2/3 md:w-full sm:w-full text-center p-2'>

            <div className='col-span-6 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                <h1 className='text-5xl font-bold'>Waiting to start</h1>
            </div>
                
            <div className='sm:col-span-3 col-span-6  flex flex-col items-center justify-center bg-base-200 rounded-xl p-4 gap-2'>
                <p className='text-xl opacity-60'>Game code:</p>
                <h1 className='lg:text-8xl md:text-7xl sm:text-6xl font-black text-primary cursor-pointer transition-all ease-in-out duration-200 hover:text-primary/60'
                    onClick={(e:any) => {
                        if (e.target.innerText === '*'.repeat(id.length)) {
                            // if the text is dots, set it to the id
                            e.target.innerText = id
                        } else {
                            // if the text is the id, set it to dots
                            e.target.innerText = '*'.repeat(id.length)
                        }
                    }}
                >{id}</h1>
                <p className='text-xl opacity-60'>Join at: <span className='text-primary'>alias.dickey.gg</span></p>
            </div>

            <div className='sm:col-span-3 col-span-6  flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                <p className='text-xl mb-2 opacity-60'>Scan to join:</p>
                <div id="qr_container" className='border-2 border-primary p-2 rounded-xl transition-all ease-in-out duration-200'>
                    <Image 
                        alt="QR Code to join the game" 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x2000&data=https://alias.dickey.gg/game/${id}&bgcolor=02303A&color=FFFFFF&format=png`} 
                        width={250} height={250} 
                        className='rounded-lg hover:opacity-60 cursor-pointer'
                        id='qr_code'
                        onClick={() => {
                            if (document.getElementById('qr_container')?.classList.contains('blur-md')) {
                                // if the qr code is blurred, remove the blur
                                document.getElementById('qr_container')?.classList.remove('filter', 'blur-md')
                            } else {
                                // if the qr code is not blurred, add the blur
                                document.getElementById('qr_container')?.classList.add('filter', 'blur-md')
                            }
                        }}
                    />
                </div>
            </div>

            <div className='col-span-2 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                <p>Players: <span className='text-primary font-bold'>{game?.players?.length}</span></p>
            </div>
            <div className='col-span-2 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                <p>Aliases: <span className='text-primary font-bold'>{game?.aliases?.length}</span></p>
            </div>
            <div className='col-span-2 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                <p>Round: <span className='text-primary font-bold'>{game?.round}</span></p>
            </div>

            <div className='col-span-6 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                <form className="join w-full" onSubmit={(e) => {
                    e.preventDefault()
                    enterAlias(game, alias.toString()).then((success) => {
                        if (success) {
                            setAlias('')
                            openModal('success')
                        }
                    }
                )
                }}>
                    <input className="input input-bordered input-lg join-item w-full" placeholder="Enter your Alias" value={alias} onChange={(e) => {
                        setAlias(e.target.value)
                    }} />
                    <button className="btn btn-lg join-item btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
                    </button>
                </form>
            </div>
            
            {isOwner == true ? (
                <>
                    <div className='sm:col-span-3 col-span-6 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                        <button className='btn btn-error btn-block btn-lg' onClick={() => {
                            endGame(game)
                        }}>Close Lobby</button>
                    </div>
                    <div className='sm:col-span-3 col-span-6 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                        <button className='btn btn-success btn-block btn-lg' onClick={() => {
                            startGame(game)
                        }}>Start Round</button>
                    </div>
                    
                </>
            ) : (
                null
            )}

            <div className='col-span-6 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                <p className='text-xl font-bold hover:opacity-70 cursor-pointer transition-all ease-in-out duration-200'
                    onClick={() => {
                        openModal('instructions')
                    }}
                >Click me for instructions</p>
            </div>
            {isSignedIn ? (        
                <div className='col-span-6 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
                    {isAuthLoading ?
                            <div className='skeleton w-1/2 h-5'></div>
                        :
                            <p className='text-xl font-bold text-zinc-400'>Welcome back <span className='text-primary font-bold'> {user?.email}</span></p>
                        }
                </div>
            ) : (
                null
            )}

            <SuccessModal
                message='Your alias has been added! You can close this and wait for the game to start, there is nothing else you need to do.'
            />
            <InstructionsModal />

        </div>
  	)
}
