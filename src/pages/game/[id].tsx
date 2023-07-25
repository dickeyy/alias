import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import anonSignin from '@/firebase/auth/anonSignin'
import { useState, useEffect } from 'react'
import { getAuth,  } from "firebase/auth";
import firebase, {rdb} from '@/firebase/config';
import { ref, onValue, set } from "firebase/database";
import { FaArrowRight, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import ReactPlayer from 'react-player';

import SEOHead from '@/comps/seoHead'
import Input from '@/comps/input';
import IconButton from '@/comps/iconButton';
import Button from '@/comps/button';
import SignedInAs from '@/comps/signedInAs';
import WaitingScreen from '@/comps/waitingScreen';
import PlayingScreen from '@/comps/playingScreen';
import Toast from '@/comps/toast';

const inter = Inter({ subsets: ['latin'] })

// connect to firebase database
const auth = getAuth()
const db = rdb

export default function GameLobby() {
    const router = useRouter()

    const { id } = router.query

    const [gameCode, setGameCode] = useState<string>(id as string)
    const [gameData, setGameData] = useState<any>(null)
    const [user, setUser] = useState<any>(null)
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const [isHost, setIsHost] = useState<boolean>(false)
    const [numOfAliases, setNumOfAliases] = useState<number>(0)
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
    const [hasWinner, setHasWinner] = useState<boolean>(false)

    const [enteredAlias, setEnteredAlias] = useState<string>("")

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

        // this is where we set game data
        if (isSignedIn) {
            let gameRef = ref(db, `games/${id}`);
            onValue(gameRef, (snapshot) => {
                const data = snapshot.val();
                setGameData(data)
                if (data.isActive === false) {
                    router.push('/')
                } 
                if (data.ownerId === user.uid) {
                    setIsHost(true)
                }
                if (data.isPlaying) {
                    setIsGameStarted(true)
                } else {
                    setIsGameStarted(false)
                }
                if (data.winner) {
                    setHasWinner(true)
                }
            });
        }

	}, [isSignedIn, id, user])

    useEffect(() => {
        if (gameData) {
            if (!checkIfUserIsInGame(user, gameData)) {
                // user is not in game
                joinGame(user, id as string, gameData)
            } 
        }
    }, [gameData])

    const addAlias = () => {
        // add alias to database
        // generate random id
        // check if alias is not empty
        if (enteredAlias.length === 0) {
            setToastTitle('Alias cannot be empty')
			setToastType('error')
			setToast(true)
			setTimeout(() => {
				setToast(false)
			}, 5100)
            return
        }

        let aliasId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        set(ref(db, `games/${id}/aliases`), {
            ...gameData.aliases,
            [aliasId]: {
                id: aliasId,
                name: enteredAlias
            }
        }).then(() => {
            // set entered alias to empty string
            setEnteredAlias("")

            setToastTitle('Successfully added alias')
			setToastType('success')
			setToast(true)
			setTimeout(() => {
				setToast(false)
			}, 5100)
            return
        }).catch((err) => {
            console.error(err)
        })
    }

    // start game
    const startGame = () => {
        // set game to playing
        set(ref(db, `games/${id}`), {
            ...gameData,
            isPlaying: true
        }).then(() => {
            setToastTitle('Game started')
			setToastType('success')
			setToast(true)
			setTimeout(() => {
				setToast(false)
			}, 5100)
            return
        }).catch((err) => {
            console.error(err)
        })
    }

    // eliminate player
    const toggleEliminated = (aliasId: string) => {
        // first check if the id has isEliminated set to true
        if (gameData.aliases[aliasId].isEliminated) {
            // user is already eliminated, set isEliminated to false
            set(ref(db, `games/${id}/aliases`), {
                ...gameData.aliases,
                [aliasId]: {
                    ...gameData.aliases[aliasId],
                    isEliminated: false
                }
            }).then(() => {

                console.log("player is not eliminated")

            }).catch((err) => {
                console.error(err)
            })
        } else {
            // set isEliminated to true
            set(ref(db, `games/${id}/aliases`), {
                ...gameData.aliases,
                [aliasId]: {
                    ...gameData.aliases[aliasId],
                    isEliminated: true
                }
            }).catch((err) => {
                console.error(err)
            })
        }
    }

    // back to lobby
    const backToLobby = () => {
        // set game to not playing
        set(ref(db, `games/${id}`), {
            ...gameData,
            isPlaying: false,
            aliases: {},
            round: gameData.round + 1
        }).then(() => {
            console.log("sent back to lobby")
        }).catch((err) => {
            console.error(err)
        })
    }

    // close lobby
    const closeLobby = () => {
        // set game to not active
        set(ref(db, `games/${id}`), {
            ...gameData,
            isActive: false
        }).then(() => {
            console.log("lobby closed")
        }).catch((err) => {
            console.error(err)
        })
    }

    const [toast, setToast] = useState(false)
	const [toastTitle, setToastTitle] = useState('')
	const [toastType, setToastType] = useState('')
 
    const [audioPlaying , setAudioPlaying] = useState<boolean>(false)

    return (
        <main className={`flex min-h-screen flex-col items-center justify-center sm:p-24 p-2 pt-10 pb-10 ${inter.className}`}>
			<SEOHead title={"Play"} />

            <audio id="audio" src="/background.mp3" preload="auto"></audio>

            <div className="flex flex-row top-5 right-5 absolute">
                
                <button className="text-2xl font-bold text-white/40 hover:text-green-700 transition duration-200 ease-in-out" onClick={() => {
                    const audio = document.getElementById('audio') as HTMLAudioElement
                    if (audioPlaying) {
                        audio.pause()
                    } else {
                        audio.play()
                    }
                    // toggle audio playing
                    setAudioPlaying(!audioPlaying)
                }}>
                    {audioPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
                </button>
            </div>

            {!isGameStarted ? (

                <WaitingScreen
                    id={id as string}
                    user={user}
                    gameData={gameData}
                    isHost={isHost}
                    setEnteredAlias={setEnteredAlias}
                    enteredAlias={enteredAlias}
                    onAddAlias={addAlias}
                    startGame={startGame}
                    closeLobby={closeLobby}
                />                

            ) : ( 
                <PlayingScreen 
                    id={id as string}
                    user={user}
                    gameData={gameData}
                    isHost={isHost}
                    onEliminatePlayer={toggleEliminated}
                    backToLobby={backToLobby}
                />
            )}

        {toast && (
            <Toast title={toastTitle} type={toastType} id={'1'} duration={5000} />
        )}

        </main>
    )
}

function joinGame(user: any, gameCode: string, gameData: any) {
    // this will run if the user visiting the page has not joined the game yet
    // this will add the user to the game in the database

    // add user id to the array
    set(ref(db, `games/${gameCode}`), {
        ...gameData,
        playerIds: [...gameData.playerIds, user.uid]
    }).then(() => {
        return true
    }).catch((err) => {
        console.error(err)
        return false
    })
}

function checkIfUserIsInGame(user: any, gameData: any) {
    // this will run if the user visiting the page has already joined the game
    // this will check if the user is in the game in the database
    // look if userU    id is in gameData.playerIds
    if (gameData.playerIds?.includes(user.uid)) {
        return true
    }
    return false
}   