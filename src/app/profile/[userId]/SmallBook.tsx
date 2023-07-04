import Image from 'next/image'
import styles from './SmallBook.module.css'

export function SmallBook() {
    return (
        <div className={styles.container}>
            <Image alt="book placeholder" src={"/images/book-placeholder.png"} width={60} height={85} style={{objectFit: 'contain'}}/>
            <div className={styles.textContainer}>
                <div className={styles.headerBodySeparator}>
                    <div className={styles.titles}>
                        <h3 className={styles.title}>BOOK PLACEHOLDER</h3>
                        <h3>SOME AUTHOR</h3>
                        <h3>START DATE: <span>04/05/2020</span></h3>
                        <h3>GENRE</h3>
                    </div>
                    <div className={styles.progress}>
                        <h3 style={{flex: 1}}>PROGRESS</h3>
                        <div className={styles.progressOutline}>
                            <div className={styles.progressLine}>

                            </div>
                        </div>
                        <div className={styles.progressText}>
                            Reading  
                            <span> 6</span><span style={{color: 'var(--theme-light-grey)'}}>/11 </span>
                            pages
                        </div>
                    </div>
                    <div className={styles.scoreContainer}>
                        <div className={styles.scoreWrapper}>
                            <h3>SCORED</h3>
                            <div className={styles.displayScore}>8.4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}