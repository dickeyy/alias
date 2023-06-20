export default function Button(props: {
    text: string,
    variant: "primary" | "outline",
    color: string,
    textColor: string,
    className?: string,
    onClick?: () => void
    isDisabled?: boolean
}) {

    return (
        <>
            {props.variant == "primary" ? (
                <>
                    {props.isDisabled ? (
                        <button 
                        className={`
                            ${props.className}
                            bg-${props.color}-700
                            text-${props.textColor}-100
                            opacity-40
                            transition
                            duration-200
                            ease-in-out
                            rounded-xl
                            cursor-not-allowed
                            px-4
                            py-2
                        `} 
                            disabled={true}
                            aria-disabled={true}
                            onClick={props.onClick}
                        >
                            {props.text}
                        </button>
                    ) : (
                        <button 
                            className={`
                                ${props.className}
                                bg-${props.color}-700
                                text-${props.textColor}-100
                                hover:bg-opacity-80
                                transition
                                duration-200
                                ease-in-out
                                rounded-xl
                                px-4
                                py-2
                            `} 
                            onClick={props.onClick}
                        >
                            {props.text}
                        </button>
                    )}
                </>
            ) : props.variant == "outline" ? (
                <>
                    <button 
                        className={`
                            ${props.className}
                            bg-transparent
                            border-2
                            border-${props.color}-700
                            text-${props.color}-300
                            hover:bg-green-700
                            hover:bg-opacity-10
                            transition
                            duration-200
                            ease-in-out
                            rounded-xl
                            px-4
                            py-2
                        `} 
                        onClick={props.onClick}
                    >
                        {props.text}
                    </button>
                </>
            ) : (
                <></>
            )}
        </>
    )
}