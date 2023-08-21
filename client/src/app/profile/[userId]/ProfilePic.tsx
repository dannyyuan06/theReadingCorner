'use client'
import Image from 'next/image'
import styles from './ProfilePic.module.css'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { UploadImageType } from '@/lib/types/fetchTypes/uploadImage'
import { UploadProfile } from './UploadProfile'

export function ProfilePic({username, profilePic}: {username: string, profilePic: string}) {
    const {data}:any = useSession()

    const [clicked, setClicked] = useState(false)

    const uploadedImage = async (reader: FileReader) => {
        const req:UploadImageType = {
            image: reader.result ? reader.result.toString() : "" ,
            username: username
        }
        const res = await fetch('/api/uploadImage', {
            method: 'POST',
            body: JSON.stringify(req),
            headers: { "Content-Type": "application/json" }
        })
        const body = await res.json()
        setClicked(false)
    }

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
                <Image src={profilePic} style={{borderRadius: '50%'}} width={100} height={100} alt="profile picture placeholder"/>
            }
        </div>
        {clicked && <UploadProfile upload={uploadedImage} setClicked={setClicked}/>}
        </>
    )
}