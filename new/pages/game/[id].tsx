import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import WaitingScreen from '@/comps/waitingSceen'
import supabase from '@/lib/supabase'
import PlayingScreen from '@/comps/playingScreen'
import ErrorModal from '@/comps/modals/errorModal'
import useModal from '@/hooks/useModal'
import useUser from '@/hooks/useUser'

const inter = Inter({ subsets: ['latin'] })

async function getGame(id:string) {
    const { data, error } = await supabase.from('games').select('*').eq('code', id).single()

    if (error) {
        console.log(error)
    } else {
        return data
    }
}

export default function Page() {

    const router = useRouter()
    const { id } = router.query
    const [game, setGame] = useState({} as any)

    useEffect(() => {
        if (id) {
            getGame(id as string).then((data) => {
                setGame(data)
            })
        }
    }, [id])

    supabase.channel(`game:${id}`).on("postgres_changes", { event: "*", schema: '*' }, payload => {
        setGame(payload.new)
        console.log(payload.new)
    }).subscribe()

    useEffect(() => {
        if (game?.active === false) {
            router.push('/')
        }
    }, [game, router])

	return (
    	<main
      		className={`flex min-h-screen flex-col items-center justify-center lg:p-24 md:p-10 sm:p-2 ${inter.className}`}
      		data-theme="main"
    	>
      		
            {game?.started ? (
                <PlayingScreen game={game} />
            ) : (
                <WaitingScreen game={game} />
            )}

            <ErrorModal
				error={{
					message: "Try again later",
				}}
				buttonText="Okay"
				buttonHref="/"
			/>

    	</main>
  	)
}
