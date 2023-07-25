import styles from './navigationButton.module.css'
import { camelToTitle } from './camelAndTitle'
import Link from 'next/link'
type propsType = {
    currentPage: string,
    pageTitle: string,
    isClub?: boolean,
    username?: string
}

export function ProfileButton({currentPage, pageTitle, isClub, username}: propsType) {
    const isActive = currentPage.split("/")[0] === pageTitle
    return (
        <div  style={isClub ? {marginTop: 'auto', marginBottom: '40px'} : {}} className={styles.container}>
            {isActive && 
            <div className={styles.marker} style={{backgroundColor: 'var(--theme-blue)'}}>
            </div>}
            <Link href={username ? `/profile/${username}`: `/profile/testing1`}>{camelToTitle(pageTitle)}</Link>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}