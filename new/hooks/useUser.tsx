// make a custom hook called useUser that returns the a user object

import supabase from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const useUser = () => {

    const [user, setUser] = useState(undefined as any)
    const [session, setSession] = useState(undefined as any)
    const [isAuthLoading, setLoading] = useState(true)
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        async function getuser() {
            const session = await supabase.auth.getSession()
            setSession(session?.data?.session ?? {} as any)
            setUser(session?.data?.session?.user ?? {} as any)

            if (session?.data?.session?.user) {
                setIsSignedIn(true)
            }

            setLoading(false)
        }

        getuser()
    }, [])

    return {user, session, isAuthLoading, isSignedIn} as const
}

export default useUser