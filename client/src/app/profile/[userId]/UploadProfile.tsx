'use client'
import { UploadImage } from '@/app/components/UploadImage'
import styles from './UploadProfile.module.css'
import { Dispatch, SetStateAction } from 'react'


export function UploadProfile({upload, setClicked}: {upload: (reader: FileReader) => Promise<void>, setClicked: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className={styles.container}>
            <form className={styles.wrapper}>
                <UploadImage upload={upload} size={500} aspectRatio={1}/>
                <button className={styles.cancelButton} onClick={() => setClicked(false)}>Cancel</button>
            </form>
        </div>
    )
}