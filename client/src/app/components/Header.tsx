'use client'
import { signOut, useSession } from 'next-auth/react'
import styles from './Header.module.css'

export function Header() {
    const {status} = useSession()
     
    const signouthandler = () => {
        signOut({ redirect: true, callbackUrl: process.env.NEXT_PUBLIC_HOST! })
    }

    return status === "authenticated" && (
        <div className={styles.container}>
            <button onClick={signouthandler}>
                Logout
            </button>
        </div>
    )
}