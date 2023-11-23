/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

export default function InstructionsModal(props:any) {
    return (
        <dialog id="instructions_modal" className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box max-w-5xl shadow-sm shadow-black border border-gray-700 text-left">
                <h2 className="font-bold text-2xl">How to play Alias</h2>
                
                <div className="divider divider-neutral"></div>

                <h3 className="font-bold text-xl mt-4">What is it?</h3>
                <p className="mt-2">This is a website version of a game my family plays. We used to have to play on paper, however, we usually only play it on vacation. As you can imagine, finding large pieces of paper in hotels or rental houses can be hard. So I decided to make an easier way to play.</p>

                <div className="divider divider-neutral"></div>
                
                <h3 className="font-bold text-xl mt-4">How do I play?</h3>
                <p className="mt-2">The game itself is simple, here are the steps for the website version:</p>
                <ol className="list-decimal ml-6 mt-2 gap-2">
                    <li>
                        Have a group of at least 4 people. The more you have the better!
                    </li>
                    <li>
                        To create a game, you must first sign in. Don't worry though, no one else <span className="italic">has</span> to sign in, just the person who is hosting the game.
                    </li>
                    <li>
                        Once you're signed in, click the "Create a Game" button on the home page. This will send you to a waiting screen.
                    </li>
                    <li>
                        On the waiting screen, you will see a game code. This is what other people will use to join your game. You can also scan the QR code to join the game.
                    </li>
                    <li>
                        This is the tricky part. Not everyone who is playing, has to join the lobby. If you are playing with people who don't have phones, it's ok! Share the phones. As long as someone joins, you can pass the phone around when it's your turn to enter your alias.
                    </li>
                    <li>
                        Now it's time to think of an alias. An alias is a fake name of either, A. a famous or notable person (real or fictional), or B. someone that everyone in the group knows. For example, if you were playing with your family, you could use your mom's name as your alias. Or if you were playing with your friends, you could use a famous person's name as your alias. You want this alias to be hard to associate with you, so think outside the box!
                    </li>
                    <li>
                        Once you have your alias, enter it into the text box, and click the arrow to the right. This will submit your alias and you are good to go. Your alias is NOT associated with your device or account, so you can share your phone to make it faster to get all the aliases in. 
                    </li>
                    <li>
                        If there's 10 people playing, there should be 10 aliases entered, this number is shown on the waiting screen. The player count on the waiting screen is how many devices joined the lobby, if you are playing in person you can ignore this. 
                    </li>
                    <li>
                        Once all aliases are entered, the host will click "Start Game". This will take you to the game screen.
                    </li>
                    <li>
                        You will then be displayed with a page where you can see a display of every alias. Anyone who has joined the game will be able to see it on their device or you can look at the host device. 
                    </li>
                    <li>
                        Now choose who will go first (for the first round it doesn't matter who).
                    </li>
                    <li>
                        The first player will then read all the aliases and guess the true identity of one alias. For example they would say "Kyle, are you John Stamos?"
                    </li>
                    <li>
                        If Kyle's alias is John Stamos, then Kyle is out, and the player who guessed correctly gets to keep guessing. If not, then Kyle is still in and it is now their turn to guess. 
                    </li>
                    <li>
                        The game continues until there is only one person left. That person is the winner!
                    </li>
                </ol>
                <button className="btn btn-primary mt-10 btn-block">Close</button>
            </form>
        </dialog>
    )
}