'use client'
import { useSession } from 'next-auth/react'
import styles from './FriendRequestButton.module.css'
import { useState } from 'react'


export function FriendRequestButton({friendUsername, alreadyRequested, alreadyFriends}: {friendUsername: string, alreadyRequested:boolean, alreadyFriends:boolean}) {

    const { data }: any = useSession()
    const [showed, setShowed] = useState(true)

    const requested = showed && !alreadyRequested

    const clickHandler = async () => {
        if (!requested) return
        await fetch('/api/friends', {
            method: 'POST',
            body: JSON.stringify({username: data.username, friendUsername}),
            headers: { "Content-Type": "application/json" }
        }).then((res) => res.json())
        .then(() => {
            setShowed(false)
        })
    }


    return !alreadyFriends && (
        <button className={styles.container} style={!requested ? {backgroundColor: 'var(--theme-light-light-grey)'}: {}} onClick={clickHandler}>{requested ? "Send Friend Request": "Requested"}</button>
    )
}