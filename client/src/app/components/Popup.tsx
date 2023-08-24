'use client'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import styles from './Popup.module.css'
import { PageHeader } from './PageHeader'


export function Popup({children, title, setClicked, confirm}: {children: ReactNode, title?: string, setClicked: Dispatch<SetStateAction<boolean>>, confirm: () => void}) {

    const onCancel = () => {
        setClicked(false)
    }

    const onConfirm = () => {
        confirm()
        // setClicked(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <PageHeader>{title}</PageHeader>
                <div>
                    {children}
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.cancel} onClick={onCancel}>Cancel</button>
                    <button className={styles.confirm} onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    )
}