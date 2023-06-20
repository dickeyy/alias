export default function Input (props: {
    placeholder: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
}) {

    return (
        <input
            className={`
                ${props.className}
                bg-transparent
                border-2
                border-green-700
                text-white
                hover:bg-green-300
                placeholder-zinc-500
                hover:bg-opacity-10
                transition
                duration-200
                ease-in-out
                rounded-xl
                px-4
                py-2
                outline-none
            `}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
        />
        
    )

}