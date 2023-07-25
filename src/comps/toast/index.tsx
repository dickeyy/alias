import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function Toast({ title, type, id, duration }: { title: string, type: string, id: string, duration: number }) {

    const [isVis, setIsVis] = useState(true)

    // set a timeout to remove the toast
    setTimeout(() => {
        setIsVis(false)
    }, duration)

    if (type === 'success') {
        return (
                <AnimatePresence>
                    {isVis && (
                        <motion.div id={id} className="flex items-center w-full max-w-xs p-4 mb-4 text-white bg-green-500 bg-opacity-20 rounded-[12px] shadow dark:text-gray-400 z-50 fixed bottom-0" role="alert"
                            initial={{
                                y: 10,
                                opacity: 0
                            }}
                            animate={{
                                y: 0,
                                opacity: 1
                            }}
                            exit={{
                                y: 10,
                                opacity: 0
                            }}
                        >
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-600 rounded-[12px] dark:bg-green-800 dark:text-green-200">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Check icon</span>
                            </div>
                            <div className="ml-3 text-md text-white">{title}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
        )
    
    } else if (type === 'error') {
        return (
            <AnimatePresence>
                {isVis && (
                    <motion.div id={id} className="flex items-center w-full max-w-xs p-4 mb-4 text-white bg-red-500 bg-opacity-20 rounded-[12px] shadow dark:text-gray-400 z-50 fixed bottom-0" role="alert"
                        initial={{
                            y: 10,
                            opacity: 0
                        }}
                        animate={{
                            y: 0,
                            opacity: 1
                        }}
                        exit={{
                            y: 10,
                            opacity: 0
                        }}
                    >
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-600 rounded-[12px] dark:bg-red-800 dark:text-red-200">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Error icon</span>
                        </div>
                        <div className="ml-3 text-sm text-white">{title}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    } else {
        return (
            <p>
                coming soon
            </p>
        )
    }

}