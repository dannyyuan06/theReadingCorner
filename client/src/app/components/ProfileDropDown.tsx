'use client'
import Image from 'next/image'
import styles from './ProfileDropDown.module.css'
import { Dispatch, SetStateAction } from 'react'
import { Users } from '@prisma/client'
import { userType } from '@/models/User'

let timeout:ReturnType<typeof setTimeout>

export function ProfileDropDown({setShowProfile, user} : {setShowProfile: Dispatch<SetStateAction<boolean>>, user: userType}) {
    
    const mouseLeftHandler = () => {
        timeout = setTimeout(() => {
            setShowProfile(false)
        }, 200)
    }

    const mouseEnterHandler = () => {
        if (timeout) clearTimeout(timeout)
    }

    return (
        <div className={styles.container} onMouseLeave={mouseLeftHandler} onMouseEnter={mouseEnterHandler}>
            <Image alt="profile picture placeholder" src={user.profilePicture} style={{borderRadius: '50%'}} width={50} height={50}/>
            <div className={styles.profileTexts}>
                <div className={styles.name}>{user.firstName} {user.lastName}</div>
                <div className={styles.stats}>Forum Posts: {user.numBulletinPosts}</div>
                <div className={styles.stats}>Books Read: {user.numBooksRead}</div>
            </div>
        </div>
    )
}