'use client'
import Image from "next/image";
import styles from "./CurrentlyReadingBook.module.css"
import Link from "next/link";
import { getCurrentlyReadingBooksType } from "@/models/CurrentlyReading";
import { SetStatusButton } from "./SetStatusButton";
import { useState } from "react";

export function CurrentlyReadingBook({currentlyReading}: {currentlyReading: getCurrentlyReadingBooksType}) {
    const {book, ...currentBook} = currentlyReading

    const [current, setCurrent] = useState(currentBook)

    const imageLink = `https://books.google.com/books/publisher/content/images/frontcover/${book.bookid}?fife=w400-h600&source=gbs_api&`
    return (
        <div className={styles.container}>
            <Link href={`/books/${book.bookid}`} style={{backgroundColor: 'transparent'}}>
                <Image loading="eager" className={styles.image} alt="book placeholder" src={imageLink} width={200} height={330} style={{objectFit: 'cover'}}/>
            </Link>
            <div className={styles.textContainer}>
                <div className={styles.headerBodySeparator}>
                    <div className={styles.titles}>
                        <Link href={`/books/${book.bookid}`}><h2 className={styles.bookTitle}>{book.title}</h2></Link>
                        <h3>AUTHOR{book.author.includes(",") && "S"}: {book.author}</h3>
                        <h3>START DATE: <span>{(new Date(current.dateStarted)).toDateString().split(" ").slice(1).join(" ")}</span></h3>
                        <h3>PAGE: <span>{current.pageNumber === -1 ? "" : current.pageNumber}/{book.pageCount}</span></h3>
                        <h3>STATUS: <span>{current.status}</span></h3>
                        <h3>AFFILIATE LINK: <span><a href={current.affiliateLink} target="_blank">LINK</a></span></h3>
                    </div>
                    <div className={styles.scoreContainer}>
                        <div className={styles.scoreWrapper}>
                            <h3>AVERAGE SCORE</h3>
                            <div className={styles.displayScore}>{currentlyReading.averageRating * 2}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.bodyWrapper} dangerouslySetInnerHTML={{__html: book.description}}/>
                <div className={styles.moreInfoWrapper}>
                    <SetStatusButton currentlyReading={current} book={book} setCurrent={setCurrent}/>
                    <Link href={`/books/${book.bookid}`}>
                            <span className={styles.moreInfoText}>MORE INFO</span>
                            <Image alt='Small Share Logo' src='/images/Share_Logo_Small.png' width={30} height={30}
                                style={{ marginBottom: 5}}
                            />
                    </Link>
                </div>
            </div>
        </div>
    )
}