import styles from './SmallBook.module.css'
import { userBookWithBook } from '@/models/UserBook'
import Image from 'next/image'
import Link from 'next/link'

const statusArray = ["HAVEN'T READ", "READING", "FINISHED", "ON HOLD", "DROPPED"]
const statusColor = ["", "var(--theme-purple)", "var(--theme-green)", "var(--theme-orange)", "var(--theme-orange)"]

export function SmallBook({userbook}: {userbook: userBookWithBook}) {
    const book = userbook.book
    function cut(str: string, length: number) {
        return str.length > length ? str.substring(0, length - 4) + '...' : str
    }

    return (
        // <div className={styles.container}>
        <>
            <Link href={`/books/${book.bookid}`} style={{backgroundColor: 'transparent'}}>
                <Image alt="book placeholder" src={book.bookPicture} width={60} height={85} style={{objectFit: 'contain'}}/>
            </Link>
            <div className={styles.titles}>
                        <Link href={`/books/${book.bookid}`}><h3 className={styles.title}>{cut(book.title, 20)}</h3></Link>
                        <h3>AUTHOR: {cut(book.author, 25)}</h3>
                        <h3>START DATE: <span>{userbook.dateStarted.toDateString().split(" ").slice(1).join(" ")}</span></h3>
                        <h3>FINISH DATE: {cut(userbook.dateFinished.valueOf() === 0 ? "Reading" : userbook.dateFinished.toDateString().split(" ").slice(1).join(" "), 25)}</h3>
                    </div>
                    <div className={styles.progress}>
                        <h3 style={{flex: 1}}>PROGRESS:&nbsp;
                        <span style={{color: statusColor[userbook.status]}}>
                            {statusArray[userbook.status]}
                        </span>
                        </h3>
                        <div className={styles.progressOutline}>
                            <div className={styles.progressLine} style={{width: `${userbook.page/book.pageCount*100}%`}}>

                            </div>
                        </div>
                        <div className={styles.progressText}>
                            Reading  
                            <span> {userbook.page}</span><span style={{color: 'var(--theme-light-grey)'}}>/{book.pageCount} </span>
                            pages
                        </div>
                    </div>
                    <div className={styles.scoreContainer}>
                        <div className={styles.scoreWrapper}>
                            <h3>SCORED</h3>
                            <div className={styles.displayScore}>{userbook.score}</div>
                        </div>
                    </div>
            {/* <div className={styles.textContainer}>
                <div className={styles.headerBodySeparator}>
                    
                </div>
            </div> */}
        </>
        // </div>
    )
}