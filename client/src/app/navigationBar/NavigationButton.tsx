import styles from './navigationButton.module.css'
import { camelToTitle } from './camelAndTitle'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
type propsType = {
    currentPage: string,
    pageTitle: string,
    isClub?: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export function NavigationButton({setIsLoading, currentPage, pageTitle, isClub}: propsType) {
    const isActive = currentPage === pageTitle

    return (
        <div  style={isClub ? {marginTop: 'auto', marginBottom: '40px'} : {}} className={styles.container}>
            {isActive && 
            <div className={styles.marker} style={{backgroundColor: 'var(--theme-blue)'}}>
            </div>}
            <Link href={`/${pageTitle}`} onClick={() => setIsLoading(!isActive)}>{camelToTitle(pageTitle)}</Link>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}