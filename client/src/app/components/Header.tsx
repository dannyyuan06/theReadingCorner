'use client'
import { signOut, useSession } from 'next-auth/react'
import styles from './Header.module.css'

export function Header() {
    const {data: session, status} = useSession()

    console.log(session, status)
     
    const signouthandler = () => {
        signOut()
    }

    return (
        <div className={styles.container}>
            <button onClick={signouthandler}>
                Logout
            </button>
        </div>
    )
}