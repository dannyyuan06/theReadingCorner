import Image from 'next/image'
import styles from './BookAttachment.module.css'
import { Dispatch, SetStateAction } from 'react'
import { BookLink } from '../bulletinBoard/BookLink'
import { allBooks } from '../bulletinBoard/books'
import Link from 'next/link'

export function BookAttackment({book, index, setBooks}: {book: string, index: number, setBooks?: Dispatch<SetStateAction<string[]>>}) {
    const crosshandler = () => {
        setBooks!((prev: string[]) => {
            let prevCopy:string[] = JSON.parse(JSON.stringify(prev))
            for (let i=0;i<prevCopy.length;i++) {
                if (prevCopy[i] === book) {
                    prevCopy.splice(i,1)
                }
            }
            return prevCopy
        })
    }

    return (
        <>
            {index !== 0 && <hr/>}
            <div className={styles.bookContainer}>
                <BookLink link={`/books/${book}`} book={book}/>
                <div className={styles.booksInfoTitleAuthor}>
                    <Link href={`/books/${book}`}>
                        <div className={styles.booksInfoTitle}>{allBooks[book].volumeInfo.title}</div>
                    </Link>
                    <div className={styles.booksInfoAutho}>{allBooks[book].volumeInfo.authors.join(", \n")}</div>
                </div>
                <div className={styles.booksInfoBlurb}>{allBooks[book].volumeInfo.description}</div>
                <div></div>
                {
                    setBooks && 
                    <button className={styles.cancelCross} onClick={crosshandler}>
                        <Image width={20} height={20} alt='cancel cross' src='/images/cross.svg'/>
                    </button>
                }
            </div>
        </>
    )
}