import Image from "next/image";
import styles from "./CurrentlyReadingBook.module.css"


export function CurrentlyReadingBook() {
    return (
        <div className={styles.container}>
            <Image alt="book placeholder" src={"/images/book-placeholder.png"} width={200} height={330}/>
            <div className={styles.textContainer}>
                <div className={styles.headerBodySeparator}>
                    <div className={styles.titles}>
                        <h2>BOOK PLACEHOLDER</h2>
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
                <div className={styles.bodyWrapper}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </div>
                <div className={styles.moreInfoWrapper}>
                    <button className={styles.moreInfoButton}>
                        <span className={styles.moreInfoText}>MORE INFO</span>
                        <Image alt='Small Share Logo' src='/images/Share_Logo_Small.png' width={30} height={30}
                            style={{filter: 'invert(1)', marginBottom: 5}}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}