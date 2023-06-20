export default function Button(props: {
    text: string,
    variant: "primary" | "outline",
    color: string,
    textColor: string,
    className?: string,
    onClick?: () => void
    isDisabled?: boolean
}) {

    if (props.variant == "primary") {

        if (props.isDisabled) {
            return (
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
                )
        }
    
        return (

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
        )
    } else if (props.variant == 'outline') {
        return (
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
        )
    }
}