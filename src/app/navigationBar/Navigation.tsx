'use client'
import { CSSProperties, useEffect } from 'react'
import styles from './navigation.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NavigationButton } from './NavigationButton'
import Link from 'next/link'
import { ProfileButton } from './ProfileButton'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { changePage } from '@/redux/features/pageSlice'


const imageStyle:CSSProperties = {
    margin: 5,
    objectFit: 'cover',
    height:  'auto'
}

export function Navigation() {
    const pathname = usePathname()
    const page = useAppSelector((state) => state.pageReducer)

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(changePage(pathname ? pathname.slice(1) : "adminDashboard"))
    }, [pathname, dispatch])
    return (
        <nav className={styles.container}>
            <div className={styles.wrapper}>
                <Link className={styles.logoButton} onClick={() => dispatch(changePage("adminDashboard"))} href={'/adminDashboard' }>
                <Image src='/images/TRC_Logo_Primary_RGB_Lge.png' width={160} height={160} alt='TRC Logo' style={imageStyle}/>
                </Link>
                <ul className={styles.ul}>
                    <NavigationButton currentPage={page} pageTitle='adminDashboard'/>
                    <NavigationButton currentPage={page} pageTitle='members'/>
                    <NavigationButton currentPage={page} pageTitle='clubStatistics'/>
                    <hr color='black'/>
                    <NavigationButton currentPage={page} pageTitle='aboutOurClub'/>
                    <ProfileButton currentPage={page} pageTitle='profile'/>
                    <NavigationButton currentPage={page} pageTitle='bulletinBoard'/>
                    <NavigationButton currentPage={page} pageTitle='currentlyReading'/>
                    <NavigationButton currentPage={page} pageTitle='meetings'/>
                    <NavigationButton currentPage={page} pageTitle='searchBooks'/>
                    <NavigationButton currentPage={page} pageTitle='clubSettings' isClub={true}/>
                </ul>
            </div>
        </nav>

    )
}