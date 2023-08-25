'use client'
import { useSession } from 'next-auth/react'
import styles from './Header.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function Header() {
    const {status} = useSession()
    const router = useRouter()
     
    const signouthandler = () => {
        router.refresh();
    }

    return status === "authenticated" && (
        <div className={styles.container}>
            <button onClick={signouthandler} className={styles.button}>
                <span style={{marginTop: 3}}>REFRESH PAGE&nbsp;</span>
                <Image src='/images/rightclick/Reset password_icon.svg' width={22} height={22} alt='refresh'/>
            </button>
        </div>
    )
}