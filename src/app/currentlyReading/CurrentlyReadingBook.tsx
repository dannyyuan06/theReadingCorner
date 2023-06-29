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
                    This book aiasdf aisdf aishdf aoishdfauhdfushdofuiahosduifhoauhdfouaf u dhlf hafhalsdfliadhlfiahsld if asdifpasodf 
                    asdflansldf asdf
                    asdfa sd
                    fasdfadsgasdngliajnd asdgasdg

                </div>
            </div>
        </div>
    )
}