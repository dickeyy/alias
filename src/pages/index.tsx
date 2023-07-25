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
import Footer from '@/comps/footer'

const inter = Inter({ subsets: ['latin'] })

// connect to firebase database
const db = getDatabase()
const auth = getAuth()

export default function Home() {

	const [gameCode, setGameCode] = useState<string>("")

	const [user, setUser] = useState<any>(null)
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

	const [showMore, setShowMore] = useState<boolean>(false)

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
				grid-cols-1 grid-flow-row sm:gap-4 gap-3
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
					{/* <Button 
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
					/> */}
					<button 
						className={`
							w-full
							h-16
							text-xl
							font-medium
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
							createGame(user)
						}}
					>
						Create a game
					</button>
				</div>

				<form className="
					flex flex-row
                    bg-white bg-opacity-[8%]
                    rounded-xl
                    p-5
                    justify-center
                    items-center
					col-span-2
					sm:col-span-1
				"
					onSubmit={(e) => {
						e.preventDefault()
					}}
				>
					<Input
						placeholder="Enter game code"
						className={`
							sm:w-full
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

				</form>
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
				{showMore ? (
					<div className="
						flex flex-row
						bg-white bg-opacity-[8%]
						rounded-xl
						p-5
						text-left
						justify-center
						items-center
						col-span-2
						w-full
					">	
						<div className="flex flex-col text-left leading-7">
							<h1 className="text-3xl font-bold text-left mb-5">
								What is it?
							</h1>
							<p className="text-xl text-zinc-400">
								This is a website version of a game my family plays. We used to have to play on paper, however, we usually only play it on vacation. As you can imagine, finding large pieces of paper in hotels or rental houses can be hard. So I decided to make an easier way to play.
							</p>
							<hr className='
								my-5
								border-1
								border-zinc-700
							'></hr>

							<h1 className="text-3xl font-bold text-left mb-5">
								How do I play?
							</h1>
							<p className="text-xl text-zinc-400">
							The game itself is simple, here are the steps for the website version:
							</p>
							<div className="flex flex-col p-5 pb-0 leading-[20px]">
								<p className="text-xl leading-relaxed text-zinc-400">
								1. Have a group of at least 4 people. The more you have the better!
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								2. On the website, click "Create Game".
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								3. Put the host device somewhere everyone can see (works best if your screencast to a TV). The host can sign in with Google and remotely control the game!
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								4. In this version, you don't have to specify an MC, so everyone can play!
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								5. Players can then either scan the QR code on the host device or go to the website and enter the code displayed.
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								6. Now, every player must think of an "Alias". The Alias needs to be either the name of a famous person or someone every player knows. So for example I could either pick "Joe Biden" or the name of another player. The alias can also be a fictional character.
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								7. Once you have your alias, enter it on either your device or someone else's (devices are not linked to aliases so if you don't have a phone, don't worry you can use someone else's)
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								8. When everyone has entered their alias, the host will click "Start Game" 
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								9. You will then be displayed with a page where you can see a display of every alias. Anyone who has joined the game will be able to see it on their device or you can look at the host device.
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								10. Now choose who will go first (for the first round it doesn't matter who). 
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								11. The first player will then read all the aliases and guess the true identity of one alias. Say "Kyle, are you John Stamos?"
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								12. If the player guesses it correctly, the host will click on the alias that was guessed and it will cross out on all devices. The player that they guessed is now out and can't be guessed again. Then, the players turn continues until they make a wrong guess. 
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								13. If you guess wrong, whoever the original player tried to guess will now repeat step 11. 
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								14. This cycle continues until one alias is remaining, the true identity of that alias is the winner! 
								</p>
								<p className="text-xl leading-relaxed text-zinc-400">
								15. If the host accidentally clicks on the wrong alias, don't worry, they can click it again and it will come back.
								</p>
							</div>

							<div className="flex flex-col p-5 pb-0 leading-[20px] justify-center items-center text-center">
								<p className="text-xl text-zinc-400 hover:text-green-700 cursor-pointer" 
									onClick={() => {
										setShowMore(!showMore)
									}}
								>
									Close directions
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="
						flex flex-row
						bg-white bg-opacity-[8%]
						rounded-xl
						p-5
						text-left
						justify-center
						items-center
						col-span-2
						w-full
					">	
						<h1 className="text-3xl font-bold text-left hover:text-green-700 cursor-pointer"
							onClick={() => {
								setShowMore(!showMore)
							}}
						>
							Click to see how to play!
						</h1>
					</div>
				)}
			</div>

			<Footer />
		
		</main>
	)
}


function createGame(user: any) {
	let gameCode = Math.floor(Math.random() * 90000).toString()

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