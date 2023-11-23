import Image from 'next/image'
import useModal from '@/hooks/useModal'
import useUser from '@/hooks/useUser'
import GoogleLoginButton from '../oauthButtons/google'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'
import WinnerModal from '../modals/winnerModal'

async function backToLobby(game:any) {
    const { error } = await supabase.from('games').update({
        started: false,
        aliases: [],
        active: true,
        round: game.round + 1,
        out_aliases: [],
    }).eq('code', game.code)

    if (error) {
        console.log(error)
        return false
    } else {
        return true
    }
}

export default function PlayingScreen(props:any) {

    const { game } = props

    const { openModal } = useModal()
    const { user, isSignedIn, isAuthLoading }:any = useUser()

    const [isOwner, setIsOwner] = useState(false)
    const [outAliases, setOutAliases] = useState(game.out_aliases || []) // an array of alias ids 
    const [winner, setWinner] = useState({} as any) // an alias object
    const [timer, setTimer] = useState(0)
    const [formattedTimer, setFormattedTimer] = useState('00:00')

    useEffect(() => {
        if (user?.id === game?.owner_id) {
            setIsOwner(true)
        }
    }, [user, game])

    const outAlias = async (alias:any) => {
        // first check if the alias is already in the outAliases array
        if (outAliases.includes(alias.id)) {
            // if it is, remove it from the outAliases array
            document.getElementById(alias.id)?.classList.remove('line-through')
            document.getElementById(alias.id)?.classList.remove('bg-red-500/30')

            // remove the alias from the outAliases array in supabase
            const { error } = await supabase.from('games').update({
                out_aliases: outAliases.filter((item:any) => item !== alias.id)
            }).eq('code', game.code)

            if (error) {
                console.log(error)
                return
            }

            return
        } else {
            // if it isn't, add it to the outAliases array

            // add the alias to the outAliases array in supabase
            const { error } = await supabase.from('games').update({
                out_aliases: [...outAliases, alias.id]
            }).eq('code', game.code)

            if (error) {
                console.log(error)
                return
            }

            return
        }
    }

    useEffect(() => {

        // if the outaliases array is 1 less than the game.aliases array, then we have a winner
        console.log(outAliases.length, game.aliases.length - 1)
        if (outAliases.length === game.aliases.length - 1) {
            // find the game.aliases.id that is not in the outAliases array of ids
            const winner = game.aliases.find((alias:any) => !outAliases.includes(JSON.parse(alias).id))
            setWinner(JSON.parse(winner))
        } else {
            setWinner({} as any)
        }

    }, [outAliases, game])

    useEffect(() => {
        setOutAliases(game.out_aliases)
    }, [game])

    useEffect(() => {
        if (winner.alias !== undefined && winner.alias !== null) {
            openModal('winner')
        }
    }, [winner, openModal])

    useEffect(() => {
        // every second, update the timer
        const interval = setInterval(() => {
            setTimer(timer + 1)

            // format the number to look like a minute:second timer
            // if the number is less than 10, add a 0 in front of it
            let minutes:any = Math.floor(timer / 60)
            let seconds:any = timer % 60

            if (minutes < 10) {
                minutes = '0' + minutes.toString()
            }
            if (seconds < 10) {
                seconds = "0" + seconds.toString()
            }

            setFormattedTimer(`${minutes}:${seconds}`)

        },1000)

        return () => clearInterval(interval)
    }, [timer])
    
	return (
        <div className='flex flex-col w-full items-center justify-center p-4'>

            <div className='absolute top-2 left-2'>
                <p className='text-3xl font-bold text-center opacity-40'>{formattedTimer}</p>
            </div>

            <div className='flex flex-col'>
                {isOwner && (
                    <h1 className='text-xl font-bold opacity-40 text-center mt-6'>Click an alias to remove it</h1>
                )}

                <div className='flex flex-row flex-wrap gap-4 items-center justify-center mt-8'>
                    {game.aliases.map((alias:any) => {
                        const parsed = JSON.parse(alias)
                        const isOut = outAliases.includes(parsed.id)
                        return (
                            <>
                                {isOwner ? (
                                    <>
                                        <div key={parsed.id} 
                                            id={parsed.id}
                                            className={`
                                                sm:w-fit w-full flex flex-col 
                                                items-center justify-center 
                                                bg-base-200 rounded-xl p-4 
                                                hover:bg-red-500/30 
                                                cursor-pointer
                                                transition-all ease-in-out duration-200
                                                ${isOut ? 'line-through bg-red-500/30' : ''}
                                            `}
                                            onClick={() => {
                                                outAlias(parsed)
                                            }}
                                        >
                                            <h1 className='sm:text-5xl text-2xl font-bold'>{parsed.alias}</h1>
                                        </div>
                                    </>
                                ) : (
                                    <div key={parsed.id} className={`sm:w-fit w-full flex flex-col items-center justify-center bg-base-200 rounded-xl p-4
                                        ${isOut ? 'line-through bg-red-500/30' : ''}

                                    `}>
                                        <h1 className='sm:text-5xl text-2xl font-bold'>{parsed.alias}</h1>
                                    </div>
                                )}
                            </>
                        )
                    })}
                </div>
            </div>
            
            {isOwner ? (
                <>
                    <button className='btn  btn-error mt-10  btn-lg' onClick={() => {
                        backToLobby(game)
                    }}>Back to Lobby</button>
                </>
            ) : (
                null
            )}

            <WinnerModal isOwner={isOwner} winner={winner.alias} backToLobby={backToLobby} game={game} />

        </div>
  	)
}
