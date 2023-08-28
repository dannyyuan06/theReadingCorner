import { PageHeader } from '@/app/components/PageHeader'
import styles from './page.module.css'
import { BookRatings } from './BookRatings'
import { QuickInfo } from './QuickInfo'
import { camelToTitle } from '@/app/navigationBar/camelAndTitle'
import Image from 'next/image'
import Book from '@/models/Book'
import { AddToCurrentlyReading } from './AddToCurrentlyReading'
import { headers } from 'next/dist/client/components/headers'
import User from '@/models/User'
import { UserBook, Book as BookPrisma } from '@prisma/client'
import { BookType } from '@/app/bookexample'

const usefulKeys = [
    "title",
    "authors",
    "publisher",
    "publishedDate",
    "pageCount",
    "printType",
    "ratingsCount",
    "categories",
]

export default async function Books({ params }: {params: {bookId: string}}) {
    const headersList = headers()
    const userUsername = headersList.get('username')
    const [bookInDB, book, userbook] = await getBook(params.bookId, userUsername ?? "")
    
    // @ts-ignore
    if (!book || book.error) return (
        <div>
            <PageHeader>Invalid BookID</PageHeader>
        </div>
    )

    const desc = book.volumeInfo.description
    const imageLink = `https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api&`

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <PageHeader>{book.volumeInfo.title}</PageHeader>
                <AddToCurrentlyReading book={book}/>
            </div>
            <div className={styles.body}>
                <div className={styles.leftBody}>
                    <Image loading='eager' alt='books image' src={imageLink} width={200} height={320} style={{objectFit: 'cover', boxShadow: "var(--shadow-button-color)"}}/>
                </div>
                <div className={styles.rightBody}>
                    <BookRatings book={book} userbook={userbook} bookInDB={bookInDB}/>
                </div>
                <div className={styles.bottomLeftBody}>
                    <div className={styles.quickInfo}>
                        <h3>QUICK INFO</h3>
                        
                        {usefulKeys.map((key) => (
                            // @ts-ignore
                            <QuickInfo key={key} title={camelToTitle(key)} value={book.volumeInfo[key]}/>
                        ))}
                    </div>
                </div>
                <div className={styles.bottomRightBody}>
                    <div className={styles.blurb}>
                        <h3>DESCRIPTION</h3>
                        <hr/>
                        <div className={styles.blurbContainer} dangerouslySetInnerHTML={{__html: desc}}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function getBook(bookid: string, userUsername:string):Promise<[BookPrisma|null, BookType|null, UserBook|null]> {
    const bookInDBPromise = Book.bookidMake(bookid)
    const bookPromise = Book.getBookWithId(bookid);
    const userBookPromise = User.hasReadBook(userUsername, bookid)
    const settleResult = await Promise.all([bookInDBPromise, bookPromise, userBookPromise])
    const [bookInDB] = settleResult[0]
    const book = settleResult[1]
    const [userBook] = settleResult[2]
    return [bookInDB, book, userBook]
  }