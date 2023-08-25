'use client'
import Image from "next/image";
import styles from "./ProfileMini.module.css"
import { ProfileDropDown } from "./ProfileDropDown";
import { useState } from "react";
import Link from "next/link";
import { userType } from "@/models/User";

let timeout:ReturnType<typeof setTimeout>

export function ProfileMini(props: {user: userType, dateSent: string}) {
    const {username, profilePicture} = props.user
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
        <Link id={styles.container} href={`/profile/${username}`}>
            <Image onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} style={{borderRadius: '50%'}} alt='profile picture placeholder' src={profilePicture} width={40} height={40}/>
            <div className={styles.userMeta}>
                <div className={styles.userName}>{username}</div>
                <div className={styles.userTimestamp}>{props.dateSent}</div>
            </div>
            <div className={styles.tooltip}>
                <ProfileDropDown setShowProfile={setShowProfile} user={props.user}/>
            </div>
        </Link>
    )
}