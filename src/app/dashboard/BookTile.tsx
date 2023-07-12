import Image from 'next/image'
import styles from './BookTile.module.css'
import tStyles from './tiles.module.css'
import { bookexample } from '../bookexample'
import Link from 'next/link'

export function BookTile({book}: {book: string}) {
    return (
        <div className={tStyles.container}>
            <div className={styles.container}>
                <Link href={`/books/${book}`}>
                    <Image alt="book placeholder" src={bookexample[book].volumeInfo.imageLinks.medium} width={100} height={155} className={styles.image}/>
                </Link>
                <div className={styles.textContainer}>
                <div className={styles.headerBodySeparator}>
                        <div className={styles.titles}>
                            <Link href={`/books/${book}`}><h2 className={styles.bookTitle}>{bookexample[book].volumeInfo.title}</h2></Link>
                            <h3>AUTHOR{bookexample[book].volumeInfo.authors.length !== 1 && "S"}: {bookexample[book].volumeInfo.authors.join(", ")}</h3>
                            <h3>START DATE: <span>04/05/2020</span></h3>
                            <h3>GENRE: {bookexample[book].volumeInfo.mainCategory}</h3>
                        </div>
                        <div className={styles.scoreContainer}>
                            <div className={styles.scoreWrapper}>
                                <h3>SCORE</h3>
                                <div className={styles.displayScore}>{bookexample[book].volumeInfo.averageRating * 2}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}