"use client"
import { ProfileFriendType, userType, userWithFriendid } from '@/models/User'
import styles from './IncomingFriend.module.css'
import { ProfileMini } from '@/app/components/ProfileMini'
import { getLastOnlineStatus } from './calculateDate'
import { Dispatch, SetStateAction } from 'react'

type propsType = {
    friend: ProfileFriendType, 
    username:string, 
    friendid:[string, string],
    setIncomingFriends:Dispatch<SetStateAction<userWithFriendid[]>>,
    setFriends:Dispatch<SetStateAction<userWithFriendid[]>>
}

export function IncomingFriend({friend, username, friendid, setIncomingFriends, setFriends}: propsType) {

    const clickHandler =  async () => {
        await fetch(`/api/friends`, {
            method: 'PATCH',
            body: JSON.stringify({friendid, username}),
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())
        .then(friendship => {
            setIncomingFriends(prev => prev.filter((friendF) => friendF.username !== friend.username))
            setFriends(prev => [...prev, {...friend, friendid: friendship.friendship.friendid}])
        })
    }

    return (
        <div key={friend.username} className={styles.friendContainer}>
            <ProfileMini user={friend} dateSent={getLastOnlineStatus(new Date(friend.lastOnline))}/>
            <button className={styles.requestContainer} onClick={clickHandler}>ACCEPT</button>
        </div>
    )
}