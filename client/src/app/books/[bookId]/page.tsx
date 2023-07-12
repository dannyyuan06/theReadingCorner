import { PageHeader } from '@/app/components/PageHeader'
import styles from './page.module.css'
import { BookRatings } from './BookRatings'
import { QuickInfo } from './QuickInfo'
import { camelToTitle } from '@/app/navigationBar/camelAndTitle'
import { allBooks } from '@/app/bulletinBoard/books'
import { bookexample } from '@/app/bookexample'
import Image from 'next/image'

const usefulKeys = [
    "title",
    "authors",
    "publisher",
    "publishedDate",
    "pageCount",
    "printType",
    "ratingsCount",
    "categories",
    "mainCategory"
]

export default function Books({ params }: {params: {bookId: string}}) {

    const desc = allBooks[params.bookId].volumeInfo.description

    return (
        <div className={styles.container}>
            <PageHeader>{bookexample[params.bookId].volumeInfo.title}</PageHeader>
            <div className={styles.bodyContainer}>
                <div className={styles.leftBody}>
                    <Image priority={true} alt='books image' src={bookexample[params.bookId].volumeInfo.imageLinks.medium} width={200} height={320} style={{objectFit: 'contain', boxShadow: "var(--shadow-button-color)"}}/>
                </div>
                <div className={styles.rightBody}>
                    <BookRatings pageCount={bookexample[params.bookId].volumeInfo.pageCount}/>
                </div>
            </div>
            <div className={styles.bottomBody}>
                <div className={styles.bottomLeftBody}>
                    <div className={styles.quickInfo}>
                        <h3>QUICK INFO</h3>
                        
                        {usefulKeys.map((key) => (
                            // @ts-ignore
                            <QuickInfo key={key} title={camelToTitle(key)} value={bookexample[params.bookId].volumeInfo[key]}/>
                        ))}
                    </div>
                </div>
                <div className={styles.bottomRightBody}>
                    <div className={styles.blurb}>
                        <h3>DESCRIPTION</h3>
                        <hr/>
                        <div className={styles.blurbContainer}>
                            {desc.split("\n").map((str: string) => <p key={str} className={styles.blurbParagraph}>{str}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}