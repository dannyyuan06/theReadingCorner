import { Dispatch, SetStateAction } from 'react'
import styles from './navigationButton.module.css'
import { camelToTitle } from './camelAndTitle'
import Link from 'next/link'
type propsType = {
    currentPage: string,
    setCurrentPage: Dispatch<SetStateAction<string>>,
    pageTitle: string,
    isClub?: boolean
}

export function NavigationButton({currentPage, setCurrentPage, pageTitle, isClub}: propsType) {
    const isActive = currentPage === pageTitle

    const clickHandler = () => setCurrentPage(pageTitle)
    return (
        <div  style={isClub ? {marginTop: 'auto', marginBottom: '40px'} : {}} className={styles.container}>
            {isActive && 
            <div className={styles.marker} style={{backgroundColor: 'var(--theme-blue)'}}>
            </div>}
            <Link href={`/${pageTitle}`} onClick={clickHandler}>{camelToTitle(pageTitle)}</Link>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}