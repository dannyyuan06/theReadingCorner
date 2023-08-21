'use client'
import { useState } from 'react'
import styles from './AddToCurrentlyReading.module.css'
import { useSession } from 'next-auth/react'
import { BookType } from '@/app/bookexample'

export function AddToCurrentlyReading({book}: {book: BookType}) {
    const [pressed, setPressed] = useState(false)
    const { data }:any = useSession()

    const submitHandler = async () => {
        const res = await fetch("/api/currentlyReading/addBook", {
            method: 'POST',
            body: JSON.stringify(book),
            headers: { "Content-Type": "application/json" }
        })
        setPressed(false)
    }
    
    return ( data  && data.accessLevel === 3 && 
        <>
            <button className={styles.container} onClick={() => setPressed(true)}>
                SET AS CURRENTLY READING
            </button>
            {pressed && 
            <div className={styles.confirmation}>
                <div className={styles.confirmationWrapper}>
                    <h2>Are you sure you want to set this book as the new Currently Reading Book?</h2>
                    <div className={styles.buttonscontainer}>
                        <button className={styles.cancel} onClick={() => setPressed(false)}>
                            CANCEL
                        </button>
                        <button className={styles.confirm} onClick={submitHandler}>
                            CONFIRM
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}