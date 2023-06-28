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
    const [currentPage, setCurrentPage] = useState('adminDashboard')

    return (
        <nav className={styles.container}>
            <div className={styles.wrapper}>
                <button className={styles.logoButton} onClick={() => setCurrentPage("adminDashboard")}>
                <Image src='/images/TRC_Logo_Primary_RGB_Lge.png' width={160} height={160} alt='TRC Logo' style={imageStyle}/>
                </button>
                <ul className={styles.ul}>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='adminDashboard'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='aboutOurClub'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='members'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='currentlyReading'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='meetings'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='clubSettings' isClub={true}/>
                </ul>
            </div>
        </nav>

    )
}