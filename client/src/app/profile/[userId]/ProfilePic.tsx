'use client'
import Image from 'next/image'
import styles from './ProfilePic.module.css'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { ProfilePicChanger } from './ProfilePicChanger'


export function ProfilePic({username, profilePic}: {username: string, profilePic: string}) {
    const {data}:any = useSession()

    const [clicked, setClicked] = useState(false)
    return (
        <>
        <div className={styles.container}>
            {data?.username === username ? (
                <button id={styles.changeImage} onClick={() => setClicked(true)}>
                    <Image src={profilePic} width={100} height={100} alt="profile picture placeholder"/>
                    <div className={styles.changeProfilePic}>Change Profile Picture</div>
                </button>
                )
                :
                <Image src={profilePic} width={100} height={100} alt="profile picture placeholder"/>
            }
        </div>
        {clicked && <ProfilePicChanger username={username} setClicked={setClicked}/>}
        </>
    )
}