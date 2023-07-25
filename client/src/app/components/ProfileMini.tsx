'use client'
import Image from "next/image";
import styles from "./ProfileMini.module.css"
import { ProfileDropDown } from "./ProfileDropDown";
import { useState } from "react";

let timeout:ReturnType<typeof setTimeout>

export function ProfileMini({name, lastOnline, picture}: {name: string, lastOnline: string, picture: string}) {

    const [showProfile, setShowProfile] = useState(false)

    const mouseEnterHandler = () => {
        timeout = setTimeout(() => {
            setShowProfile(true)
        }, 500)
    }

    const mouseLeaveHandler = () => {
        if (timeout) clearTimeout(timeout)
    }

    return (
        <div className={styles.container}>
            <Image onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} alt='profile picture placeholder' src={picture} width={40} height={40}/>
            <div className={styles.userMeta}>
                <div className={styles.userName}>{name}</div>
                <div className={styles.userTimestamp}>{lastOnline}</div>
            </div>
            {showProfile && <ProfileDropDown setShowProfile={setShowProfile}/>}
        </div>
    )
}