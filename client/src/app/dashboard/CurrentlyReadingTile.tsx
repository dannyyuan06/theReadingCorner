import Link from 'next/link'
import { BookTile } from './BookTile'
import tStyles from './tiles.module.css'
import { CurrentlyReading, getCurrentlyReadingBooksType } from '@/models/CurrentlyReading'

export async function CurrentlyReadingTile({currentlyReading}: {currentlyReading: getCurrentlyReadingBooksType | null}) {

    if (!currentlyReading) return (
        <div>
            Error fetching book <br/>
        </div>
    )


    return (
        <div>
            <Link href="/currentlyReading" className={tStyles.title}><h2>CURRENTLY READING</h2></Link>
            <BookTile book={currentlyReading}/>
        </div>
    )
}