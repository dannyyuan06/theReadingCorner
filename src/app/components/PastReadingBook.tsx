import Image from 'next/image'
import styles from './PastReadingBook.module.css'

export function PastReadingBook() {
    return (
        <div className={styles.container}>
            <Image alt="book placeholder" src={"/images/book-placeholder.png"} width={100} height={155}/>
            <div className={styles.textContainer}>
                <div className={styles.headerBodySeparator}>
                    <div className={styles.titles}>
                        <h2 className={styles.title}>BOOK PLACEHOLDER</h2>
                        <h3>SOME AUTHOR</h3>
                        <h3>START DATE: <span>04/05/2020</span></h3>
                        <h3>GENRE</h3>
                    </div>
                    <div className={styles.scoreContainer}>
                        <div className={styles.scoreWrapper}>
                            <h3>SCORE</h3>
                            <div className={styles.displayScore}>8.4</div>
                        </div>
                        <div className={styles.scoreWrapper}>
                            <h3>MY SCORE</h3>
                            <div className={styles.displayScore}>10</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}