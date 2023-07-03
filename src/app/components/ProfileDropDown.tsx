'use client'
import Image from 'next/image'
import styles from './ProfileDropDown.module.css'
import { Dispatch, SetStateAction } from 'react'

let timeout:ReturnType<typeof setTimeout>

export function ProfileDropDown({setShowProfile} : {setShowProfile: Dispatch<SetStateAction<boolean>>}) {
    
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
            <Image alt="profile picture placeholder" src="/images/profile_picture_placeholder.png" width={50} height={50}/>
            <div className={styles.profileTexts}>
                <div className={styles.name}>Danny Yuan</div>
                <div className={styles.stats}>Forum Posts: 5</div>
                <div className={styles.stats}>Books Read: 5</div>
            </div>
        </div>
    )
}