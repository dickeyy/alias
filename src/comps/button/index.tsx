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
        <div>

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
            {/* {props.isDisabled ? (
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
            )} */}
        </div>
    )
}