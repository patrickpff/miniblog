import { db } from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"
import { useEffect } from "react"

import {useState, useeffect} from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup 
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) return;
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)
            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            setLoading(false)
            setError(error.message)
        }
    }

    // to avoid memory leak:
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading
    }
}