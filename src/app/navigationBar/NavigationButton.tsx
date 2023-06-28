import { Dispatch, SetStateAction } from 'react'
import styles from './navigationButton.module.css'
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
                {pageTitle}
            </button>
            {!isActive && 
            <div className={styles.marker}>
            </div>}
        </div>
    )
}

function titleToCamel(title: string) {
    const words = title.split(' ')
    const lowerWords = words.map(word => word.toLowerCase())
    const withCapital = lowerWords.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    const joinedWord = withCapital.join("")
    const finalWord = joinedWord.charAt(0).toLowerCase() + joinedWord.slice(1)
    return finalWord
}