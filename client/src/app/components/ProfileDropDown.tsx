'use client'
import Image from 'next/image'
import styles from './ProfileDropDown.module.css'
import { Dispatch, SetStateAction } from 'react'
import { Users } from '@prisma/client'
import { ProfileFriendType, userType } from '@/models/User'
import { getLastOnlineStatus } from '../bulletinBoard/getOnlineStatus'

let timeout:ReturnType<typeof setTimeout>

export function ProfileDropDown({user} : {user: ProfileFriendType}) {

    return (
        <div className={styles.container}>
            <Image alt="profile picture placeholder" src={user.profilePicture} style={{borderRadius: '50%'}} width={50} height={50}/>
            <div className={styles.profileTexts}>
                <div className={styles.name}>{user.firstName} {user.lastName}</div>
                <div className={styles.stats}>Last Logged In: {getLastOnlineStatus(new Date(user.lastOnline))}</div>
                <div className={styles.stats}>Join Date: {new Date(user.joinDate).toDateString().split(" ").slice(1).join(" ")}</div>
            </div>
        </div>
    )
}