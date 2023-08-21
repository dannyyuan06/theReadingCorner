import styles from './navigationButton.module.css'
import { camelToTitle } from './camelAndTitle'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
type propsType = {
    currentPage: string,
    pageTitle: string,
    isClub?: boolean,
    username?: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export function ProfileButton({setIsLoading, currentPage, pageTitle, isClub, username}: propsType) {
    const isActive = currentPage === `${pageTitle}/${username}`
    return (
        <div  style={isClub ? {marginTop: 'auto', marginBottom: '40px'} : {}} className={styles.container}>
            {isActive && 
            <div className={styles.marker} style={{backgroundColor: 'var(--theme-blue)'}}>
            </div>}
            <Link href={username ? `/profile/${username}`: `/profile/testing1`} onClick={() => {setIsLoading(!isActive)}}>{camelToTitle(pageTitle)}</Link>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}