"use client"
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from './SearchFriends.module.css'
import { userType, userWithFriendid } from '@/models/User'
import { ProfileMini } from '@/app/components/ProfileMini'
import { getLastOnlineStatus } from './calculateDate'

let timeout:ReturnType<typeof setTimeout> | null

export function SearchFriends({username, setRequestPendingFriends, allFriends}: {username: string, setRequestPendingFriends:Dispatch<SetStateAction<userWithFriendid[]>>, allFriends:string[]}) {
    const [friends, setFriends] = useState<userType[]>([])
    const [err, setErr] = useState("")

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout ?? undefined)
        if (e.target.value.length === 0) {
            setErr("")
            setFriends([])
            return
        }
        if (e.target.value.length < 8) {
            setErr("Search must be more than 8 characters")
            setFriends([])
            return
        }
        setErr("")
        timeout = setTimeout(() => {
            fetch(`/api/users/searchUsers/${e.target.value}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            }).then((res) => res.json())
            .then(users => {
                setFriends(users.users)
            })
        }, 500);
    }

    return (
        <div className={styles.container}>
            <input className={styles.searchBox} type="search" placeholder='Search usernames' onChange={inputHandler}/>
            <div style={{fontSize: '0.7em', color: 'var(--theme-orange)'}}>{err}</div>
            {friends.map((friend) => (<SearchProfile friend={friend} username={username} setRequestPendingFriends={setRequestPendingFriends} allFriends={allFriends}/>))}
        </div>
    )
}


function SearchProfile({friend, username, setRequestPendingFriends, allFriends}: {friend: userType, username: string, setRequestPendingFriends:Dispatch<SetStateAction<userWithFriendid[]>>, allFriends:string[]}) {
    const clickHandler = async () => {
        await fetch('/api/friends', {
            method: 'POST',
            body: JSON.stringify({username, friendUsername: friend.username}),
            headers: { "Content-Type": "application/json" }
        }).then((res) => res.json())
        .then((user) => {
            setRequestPendingFriends((prev) => [...prev, {...friend, friendid: [user.friendship.friend1id, user.friendship.friend2id]}])
        })
    }

    if (allFriends.includes(friend.username)) return <></>

    return (
        <>
            <hr/>
            <div key={friend.username} className={styles.searchContainer}>
                <ProfileMini user={friend} dateSent={getLastOnlineStatus(new Date(friend.lastOnline))}/>
                <button className={styles.requestContainer} onClick={clickHandler}>REQUEST</button>
            </div>
        </>
    )
}