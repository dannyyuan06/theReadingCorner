'use client'
import { CSSProperties, useEffect, useState } from 'react'
import styles from './navigation.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NavigationButton } from './NavigationButton'
import Link from 'next/link'
import { ProfileButton } from './ProfileButton'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { changePage } from '@/redux/features/pageSlice'
import { signOut, useSession } from 'next-auth/react'
import Loading from '../loading/Loading'


const imageStyle:CSSProperties = {
    margin: 5,
    objectFit: 'cover',
    height:  'auto',
    transform: 'scale(1.23)'
}

export function Navigation() {
    const pathname = usePathname()
    const page = useAppSelector((state) => state.pageReducer)
    const { status, data }: any = useSession()
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(changePage(pathname.slice(1)))
        setIsLoading(false)
    }, [pathname, dispatch])

    const doNotShow = pathname === "/" || pathname.slice(1) === "register" || status !== "authenticated" || data.accessLevel === -1

    return !doNotShow && (
        <>
            <div className={styles.wrapper}>
                <nav className={styles.container} >
                    <div className={styles.wrapper}>
                        <Link className={styles.logoButton} href={'/dashboard' }>
                        <Image src='/images/TRC_Master_Logos_RGB_TRC_Logo_Primary_RGB.svg' width={160} height={160} alt='TRC Logo' style={imageStyle}/>
                        </Link>
                        <ul className={styles.ul}>
                            <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='dashboard'/>
                            <ProfileButton setIsLoading={setIsLoading} currentPage={page} pageTitle='profile' username={data?.username}/>
                            {data?.accessLevel === 3 && (
                                <>
                                    <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='members'/>
                                    <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='clubStatistics'/>
                                </>
                            )}
                            <hr color='black'/>
                            <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='aboutOurClub'/>
                            <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='bulletinBoard'/>
                            <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='currentlyReading'/>
                            <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='discountDirectory'/>
                            <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='meetings'/>
                            <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='searchBooks'/>
                            <NavigationButton setIsLoading={setIsLoading} currentPage={page} pageTitle='suggestions'/>
                            <button className={styles.logoutButton} onClick={() => signOut()}>LOGOUT</button>
                        </ul>
                    </div>
                </nav>
            </div>
            {
                isLoading && <Loading/>
            }
        </>

    )
}