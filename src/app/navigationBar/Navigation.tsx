'use client'
import { CSSProperties, useEffect, useState } from 'react'
import styles from './navigation.module.css'
import Image from 'next/image'
import { NavigationButton } from './NavigationButton'


const imageStyle:CSSProperties = {
    margin: 5,
    objectFit: 'cover',
    height:  'auto'
}

export function Navigation() {
    const [currentPage, setCurrentPage] = useState('ADMIN DASHBOARD')

    useEffect(() => {

    }, [currentPage])


    return (
        <nav className={styles.container}>
            <div className={styles.wrapper}>
                <button className={styles.logoButton} onClick={() => setCurrentPage("ADMIN DASHBOARD")}>
                <Image src='/images/TRC_Logo_Primary_RGB_Lge.png' width={160} height={160} alt='TRC Logo' style={imageStyle}/>
                </button>
                <ul className={styles.ul}>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='ADMIN DASHBOARD'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='ABOUT OUR CLUB'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='MEMBERS'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='CURRENTLY READING'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='MEETINGS'/>
                </ul>
            </div>
        </nav>

    )
}