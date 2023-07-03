'use client'
import { CSSProperties, useEffect, useState } from 'react'
import styles from './navigation.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NavigationButton } from './NavigationButton'
import Link from 'next/link'
import { ProfileButton } from './ProfileButton'


const imageStyle:CSSProperties = {
    margin: 5,
    objectFit: 'cover',
    height:  'auto'
}

export function Navigation() {
    const pathname = usePathname()
    const [currentPage, setCurrentPage] = useState(pathname ? pathname.slice(1) : "adminDashboard")
    return (
        <nav className={styles.container}>
            <div className={styles.wrapper}>
                <Link className={styles.logoButton} onClick={() => setCurrentPage("adminDashboard")} href={'/adminDashboard' }>
                <Image src='/images/TRC_Logo_Primary_RGB_Lge.png' width={160} height={160} alt='TRC Logo' style={imageStyle}/>
                </Link>
                <ul className={styles.ul}>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='adminDashboard'/>
                    <ProfileButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='profile'/>
                    <hr color='black'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='aboutOurClub'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='members'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='bulletinBoard'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='currentlyReading'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='meetings'/>
                    <NavigationButton currentPage={currentPage} setCurrentPage={setCurrentPage} pageTitle='clubSettings' isClub={true}/>
                </ul>
            </div>
        </nav>

    )
}