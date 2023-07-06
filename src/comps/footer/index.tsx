import {SiKofi} from "react-icons/si"

export default function Footer() {
    return (
        <div className="flex flex-row w-full h-fit bg-transparent absolute bottom-0 text-center justify-center items-center">
            <a className="flex flex-row justify-center items-center text-white/40 hover:bg-white/10 p-2 rounded-lg transition-all duration-150 ease-in-out" href="https://ko-fi.com/dickey" target="_blank">
                <SiKofi className="text-xl mr-2"/>
                <p>Support me on Ko-Fi</p>
            </a>
        </div>
    )
}