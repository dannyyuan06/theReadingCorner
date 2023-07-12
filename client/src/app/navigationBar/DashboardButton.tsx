import styles from './navigationButton.module.css'
import { camelToTitle } from './camelAndTitle'
import Link from 'next/link'
type propsType = {
    currentPage: string,
    pageTitle: string,
}

export function DashboardButton({currentPage, pageTitle}: propsType) {
    const isActive = currentPage === ""
    return (
        <div className={styles.container}>
            {isActive && 
            <div className={styles.marker} style={{backgroundColor: 'var(--theme-blue)'}}>
            </div>}
            <Link href='/'>{camelToTitle(pageTitle)}</Link>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}