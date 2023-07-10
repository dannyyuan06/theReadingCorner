import { Dispatch, SetStateAction } from 'react'
import styles from './navigationButton.module.css'
import { camelToTitle } from './camelAndTitle'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { changePage } from '@/redux/features/pageSlice'
import { AppDispatch } from '@/redux/store'
type propsType = {
    currentPage: string,
    pageTitle: string,
    isClub?: boolean
}

export function ProfileButton({currentPage, pageTitle, isClub}: propsType) {
    const isActive = currentPage.split("/")[0] === pageTitle

    const dispatch = useDispatch<AppDispatch>();
    const clickHandler = () => dispatch(changePage(pageTitle))
    return (
        <div  style={isClub ? {marginTop: 'auto', marginBottom: '40px'} : {}} className={styles.container}>
            {isActive && 
            <div className={styles.marker} style={{backgroundColor: 'var(--theme-blue)'}}>
            </div>}
            <Link href={`/profile/1230`} onClick={clickHandler}>{camelToTitle(pageTitle)}</Link>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}