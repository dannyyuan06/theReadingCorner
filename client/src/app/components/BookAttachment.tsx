import Image from 'next/image'
import styles from './BookAttachment.module.css'
import { Dispatch, SetStateAction } from 'react'
import { BookLink } from '../bulletinBoard/BookLink'
import Link from 'next/link'
import { Book } from '@prisma/client'

export function BookAttackment({book, index, setBooks}: {book: Book, index: number, setBooks?: Dispatch<SetStateAction<Book[]>>}) {
    const crosshandler = () => {
        setBooks!((prev: Book[]) => {
            const result = prev.filter((prev: Book) => prev.bookid !== book.bookid)
            return result
        })
    }

    return (
        <>
            {index !== 0 && <hr/>}
            <div className={styles.bookContainer}>
                <BookLink link={`/books/${book.bookid}`} image={book.bookPicture}/>
                <div className={styles.booksInfoTitleAuthor}>
                    <Link href={`/books/${book.bookid}`}>
                        <div className={styles.booksInfoTitle}>{book.title}</div>
                    </Link>
                    <div className={styles.booksInfoAutho}>{book.author}</div>
                </div>
                <div className={styles.booksInfoBlurb} dangerouslySetInnerHTML={{__html: book.description}}/>
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