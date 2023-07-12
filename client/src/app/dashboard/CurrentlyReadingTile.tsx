import Link from 'next/link'
import { BookTile } from './BookTile'
import tStyles from './tiles.module.css'

export function CurrentlyReadingTile() {
    return (
        <div>
            <Link href="/currentlyReading" className={tStyles.title}><h2>CURRENTLY READING</h2></Link>
            <BookTile book='1'/>
        </div>
    )
}