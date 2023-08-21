import Link from 'next/link'
import { BookTile } from './BookTile'
import tStyles from './tiles.module.css'
import { CurrentlyReading } from '@/models/CurrentlyReading'

export async function CurrentlyReadingTile() {
    const [book, err] = await getBook();

    if (!book) return (
        <div>
            Error fetching book <br/>
            {err}
        </div>
    )


    return (
        <div>
            <Link href="/currentlyReading" className={tStyles.title}><h2>CURRENTLY READING</h2></Link>
            <BookTile book={book}/>
        </div>
    )
}

async function getBook() {
    const book = CurrentlyReading.getCurrentlyReadingBook()
    return book
}