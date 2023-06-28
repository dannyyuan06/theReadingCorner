import { Dispatch, SetStateAction } from 'react'
import styles from './navigationButton.module.css'
import { camelToTitle } from './camelAndTitle.tsx'
type propsType = {
    currentPage: string,
    setCurrentPage: Dispatch<SetStateAction<string>>,
    pageTitle: string
}

export function NavigationButton({currentPage, setCurrentPage, pageTitle}: propsType) {
    const isActive = currentPage === pageTitle

    const clickHandler = () => setCurrentPage(pageTitle)
    return (
        <div className={styles.container}>
            {isActive && 
            <div className={styles.marker} style={{backgroundColor: 'var(--theme-blue)'}}>
            </div>}
            <button onClick={clickHandler}>
                {camelToTitle(pageTitle)}
            </button>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}