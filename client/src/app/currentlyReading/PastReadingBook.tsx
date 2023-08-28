import Image from 'next/image'
import styles from './PastReadingBook.module.css'
import Link from 'next/link'
import { getCurrentlyReadingBooksType } from '@/models/CurrentlyReading'

export function PastReadingBook({currentlyReading}: {currentlyReading: getCurrentlyReadingBooksType}) {
    const book = currentlyReading.book

    const displayAverageRating = book.averageRating === -1 ? "No Readers" : book.averageRating.toFixed(2) ?? ""

    return (
        <div className={styles.container}>
            <Link href={`/books/${book.bookid}`} style={{backgroundColor: 'transparent'}}>
                <Image alt="book placeholder" src={book.bookPicture} width={100} height={155} className={styles.image} style={{objectFit: 'cover'}}/>
            </Link>
            <div className={styles.textContainer}>
            <div className={styles.headerBodySeparator}>
                    <div className={styles.titles}>
                        <Link href={`/books/${book.bookid}`}><h2 className={styles.bookTitle}>{book.title}</h2></Link>
                        <h3>AUTHOR{book.author.includes(',') && "S"}: {book.author}</h3>
                        <h3>START DATE: <span>{(new Date(currentlyReading.dateStarted).toDateString().split(" ").slice(1).join(" "))}</span></h3>
                        <h3>STATUS: {currentlyReading.status}</h3>
                        {currentlyReading.affiliateLink && <h3>AFFILIATE LINK: <span><a href={currentlyReading.affiliateLink} target="_blank">LINK</a></span></h3>}
                    </div>
                    <div className={styles.scoreContainer}>
                        <div className={styles.scoreWrapper}>
                            <h3>AVERAGE SCORE</h3>
                            <div className={styles.displayScore}>{displayAverageRating}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}