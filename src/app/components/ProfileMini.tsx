'use client'
import Image from "next/image";
import styles from "./ProfileMini.module.css"
import { ProfileDropDown } from "./ProfileDropDown";
import { useState } from "react";

let timeout

export function ProfileMini() {

    const [showProfile, setShowProfile] = useState(false)

    const mouseEnterHandler = () => {
        timeout = setTimeout(() => {
            setShowProfile(true)
        }, 500)
    }

    return (
        <div className={styles.container}>
            <Image onMouseEnter={mouseEnterHandler} alt='profile picture placeholder' src="/images/profile_picture_placeholder.png" width={40} height={40}/>
            <div className={styles.userMeta}>
                <div className={styles.userName}>Danny Yuan</div>
                <div className={styles.userTimestamp}>Today at 18:31</div>
            </div>
            {showProfile && <ProfileDropDown setShowProfile={setShowProfile}/>}
        </div>
    )
}