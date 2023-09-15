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
    // check if the page the button is representing is the current page.
    const isActive = currentPage === pageTitle
    return (
        <div  style={isClub ? {marginTop: 'auto', marginBottom: '40px'} : {}} className={styles.container}>
            {/* if isActive then display a blue marker to indicate it is the current page */}
            {isActive && 
            <div className={styles.marker} style={{backgroundColor: 'var(--theme-blue)'}}>
            </div>}
            <Link href={`/${pageTitle}`} onClick={() => setIsLoading(!isActive)}>
                {/* converts camel case to title */}
                {camelToTitle(pageTitle)}
            </Link>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}