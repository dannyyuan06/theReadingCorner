'use client'
import styles from './navigationButton.module.css'
import { camelToTitle } from './camelAndTitle'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { changePage } from '@/redux/features/pageSlice'
type propsType = {
    currentPage: string,
    pageTitle: string,
    isClub?: boolean
}

export function NavigationButton({currentPage, pageTitle, isClub}: propsType) {
    const isActive = currentPage === pageTitle

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div  style={isClub ? {marginTop: 'auto', marginBottom: '40px'} : {}} className={styles.container}>
            {isActive && 
            <div className={styles.marker} style={{backgroundColor: 'var(--theme-blue)'}}>
            </div>}
            <Link href={`/${pageTitle}`} onClick={() => dispatch(changePage(pageTitle))}>{camelToTitle(pageTitle)}</Link>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}