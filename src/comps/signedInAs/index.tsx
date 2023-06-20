import { FaUserEdit, FaArrowRight } from 'react-icons/fa'
import editDisplayName from '../../firebase/auth/editDisplayname'
import { useState } from 'react'
import Input from '../input'
import IconButton from '../iconButton'
import GoogleButton from '../googleButton'

export default function SignedInAs(props: {
    user: any,
}) {

    const [editedName, setEditedName] = useState<string>("")
    const [showInput, setShowInput] = useState<boolean>(false)
    
    if (!props.user) return (
        <div className="flex flex-row items-center justify-center">

            Not signed in

        </div>
    )

    if (!props.user.displayName) return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center">

                Signed in as <span className="font-bold ml-1 mr-5 text-green-500">Guest</span>

                <FaUserEdit
                    className="
                        text-2xl
                        hover:text-green-700
                        transition
                        duration-200
                        ease-in-out
                        cursor-pointer
                    "
                    onClick={() => {
                        if (!showInput) {
                            setShowInput(true)
                        } else {
                            setShowInput(false)
                        }
                    }}
                />
            </div>
            {props.user.isAnonymous ? (
                <GoogleButton
                    className="mt-2"
                    onClick={() => {
                        setShowInput(false)
                    }}
                />
            ) : (
                null
            )}
            {showInput && (
                <div className="flex flex-row items-center justify-center">
                    <Input 
                        placeholder="Enter your name"
                        className="mt-2 h-12"
                        onChange={(e) => {
                            setEditedName(e.target.value)
                        }}
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
                            w-12
                            h-12
                            text-xl
                            font-medium
                            ml-2
                            mb-[-6px]
                        `}
                        onClick={() => {
                            editDisplayName(editedName)
                            setShowInput(false)
                        }}
                    />
                </div>
            )
            }
        </div>
    )

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center">

                Signed in as <span className="font-bold ml-1 mr-5 text-green-500">{props.user.displayName}</span>

                <FaUserEdit
                    className="
                        text-2xl
                        hover:text-green-700
                        transition
                        duration-200
                        ease-in-out
                        cursor-pointer
                    "
                    onClick={() => {
                        if (!showInput) {
                            setShowInput(true)
                        } else {
                            setShowInput(false)
                        }
                    }}
                />
            </div>
            {props.user.isAnonymous ? (
                <GoogleButton
                    className="mt-2"
                    onClick={() => {
                        setShowInput(false)
                    }}
                />
            ) : (
                null
            )}
            {showInput && (
                <div className="flex flex-row items-center justify-center">
                    <Input 
                        placeholder="Enter your name"
                        className="mt-2 h-12"
                        onChange={(e) => {
                            setEditedName(e.target.value)
                        }}
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
                            w-12
                            h-12
                            text-xl
                            font-medium
                            ml-2
                            mb-[-6px]
                        `}
                        onClick={() => {
                            editDisplayName(editedName)
                            setShowInput(false)
                        }}
                    />
                </div>
            )
            }
        </div>
    )
}   