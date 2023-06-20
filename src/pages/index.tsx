import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import anonSignin from "@/firebase/auth/anonSignin"
import { getDatabase, ref, set } from "firebase/database"
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SEOHead from '@/comps/seoHead'
import Button from '@/comps/button'
import Input from '@/comps/input'
import IconButton from '@/comps/iconButton'
import { FaArrowRight } from 'react-icons/fa'
import SignedInAs from '@/comps/signedInAs'
import Toast from '@/comps/toast'

const inter = Inter({ subsets: ['latin'] })

// connect to firebase database
const db = getDatabase()
const auth = getAuth()

export default function Home() {

	const [gameCode, setGameCode] = useState<string>("")

	const [user, setUser] = useState<any>(null)
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

	// on load signin anonymously with firebase
	useEffect(() => {
		
		// check if user is signed in
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user)
				setIsSignedIn(true)
			} else {
				anonSignin().then((user) => {
					setUser(user)
					setIsSignedIn(true)
				}).catch((err) => {
					console.log(err)
				})
			}
		})

	}, [])

	// join game
	const joinGame = () => {
		if (gameCode.length > 0) {
			// redirect to game page
			window.location.href = `/game/${gameCode}`
		} 
	}

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-center sm:p-24 p-1 ${inter.className}`}
		>
			<SEOHead title={"Play"} />
			<div className="
				grid 
				items-center justify-center 
				grid-cols-1 grid-flow-row gap-4
				sm:grid-cols-2
			">
				<div className="
					flex flex-col
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    justify-center
                    items-center
					col-span-2
				">
					<h1 className="text-5xl font-bold text-center">
						Welcome to Alias
					</h1>
				</div>

				<div className="
					flex flex-col
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    justify-center
                    items-center
					col-span-2
					sm:col-span-1
				">
					<Button 
						text="Create a game"
						variant="primary"
						color="green"
						textColor="slate"
						className={`
							w-full
							h-16
							text-xl
							font-medium
						`}
						onClick={() => {
							createGame(user)
						}}
					/>
				</div>

				<div className="
					flex flex-row
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    justify-center
                    items-center
					col-span-2
					sm:col-span-1
				">
					<Input
						placeholder="Enter game code"
						className={`
							sm:w-64
							h-16
							text-xl
							font-medium
							w-full
						`}
						value={gameCode}
						onChange={(e) => setGameCode(e.target.value)}
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
							joinGame()
						}}
					/>

				</div>
				<div className="
					flex flex-row
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    justify-center
                    items-center
					col-span-2
				">	
					<SignedInAs user={user} />
				</div>
			</div>
		
		</main>
	)
}


function createGame(user: any) {
	let gameCode = Math.floor(Math.random() * 1000000).toString()

	// set game code in database
	set(ref(db, `games/${gameCode}`), {
		isActive: true,
		isPlaying: false,
		ownerId: user.uid,
		playerIds: [user.uid],
		round: 1,
		aliases: [],
	}).then(() => {
		
		// game created, redirect to game page
		window.location.href = `/game/${gameCode}`

	}).catch((error) => {
		<Toast title="Something went wrong" type={"error"} id={'1'} duration={5000} />
	})
}