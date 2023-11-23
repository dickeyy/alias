import Image from 'next/image'
import { Inter } from 'next/font/google'
import GoogleLoginButton from '@/comps/oauthButtons/google'
import useUser from '@/hooks/useUser'
import useModal from '@/hooks/useModal'
import InstructionsModal from '@/comps/modals/instructionsModal'
import supabase from '@/lib/supabase'
import ErrorModal from '@/comps/modals/errorModal'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

async function createGame(user:any, openModal?:any) {
	// generate a 6 digit number
	const gameCode = Math.floor(100000 + Math.random() * 900000)
	const { error } = await supabase.from('games').insert({
		created_at: new Date().getTime(),
		players: [user.id],
		owner_id: user.id,
		code: gameCode,
		started: false,
		active: true,
		round: 1,
		aliases: [],
		out_aliases: [],
	})

	if (error) {
		openModal("error")
	} else {
		window.location.href = `/game/${gameCode}`
	}
}

async function joinGame(gameCode:string, user?:any, openModal?:any) {
	window.location.href = `/game/${gameCode}`
}

export default function Home() {

	const { user, isSignedIn, isAuthLoading }:any = useUser()
	const { openModal } = useModal()

	const [gameCode, setGameCode] = useState('')

	return (
    	<main
      		className={`flex min-h-screen flex-col items-center justify-center text-center sm:p-24 p-2 ${inter.className}`}
      		data-theme="main"
    	>
      		<div className='grid grid-cols-2 sm:gap-4 gap-2 lg:w-2/3 md:w-full sm:w-full'>

        		<div className='col-span-2 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
					<h1 className='text-5xl font-bold text-center'>Welcome to Alias</h1>
				</div>

				<div className='sm:col-span-1 col-span-2 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
					<button className='btn btn-primary btn-block btn-lg' disabled={!isSignedIn} onClick={() => {createGame(user, openModal)}}>Create a Game</button>
				</div>

				<div className='sm:col-span-1 col-span-2 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
					<form className="join w-full" onSubmit={(e) => {
						e.preventDefault()
						joinGame(gameCode, user || undefined, openModal)
					}}>
						<input className="input input-bordered input-lg join-item w-full" placeholder="Game Code" 
							onChange={(e) => {
								setGameCode(e.target.value)
							}}
							value={gameCode}
						/>
						<button className="btn btn-lg join-item btn-primary">
							<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
						</button>
					</form>
				</div>

				<div className='col-span-2 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
					<p className='text-xl font-bold hover:opacity-70 cursor-pointer transition-all ease-in-out duration-200'
						onClick={() => {
							openModal('instructions')
						}}
					>Click me for instructions</p>
				</div>

				<div className='col-span-2 flex flex-col items-center justify-center bg-base-200 rounded-xl p-4'>
					{isAuthLoading ?
						<div className='skeleton w-1/2 h-5'></div>
					:
						<>
							{!isSignedIn ? (
								<div className='w-full justify-center items-center text-center'>
									<p className='text-md mb-2 opacity-60'>Please sign in to create a game</p>
									<GoogleLoginButton />
								</div>
							) : (
								<p className='text-xl font-bold text-zinc-400'>Welcome back <span className='text-primary font-bold'> {user?.email}</span></p>
							)}
						</>
					}
				</div>

      		</div>

			<InstructionsModal />
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
