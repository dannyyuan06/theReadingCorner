import Link from 'next/link'
import { BookAttackment } from '../components/BookAttachment'
import tStyles from './tiles.module.css'

const books = ["1" , "2", "3", "4"]

export function BookSuggestionTile() {
    return (
        <div>
            <Link href='/suggestions' className={tStyles.title}><h2>BOOK SUGGESTIONS</h2></Link>
            <div className={tStyles.container}>
                {books.map((book, index) => (
                    <BookAttackment key={book} book={book} index={index}/>
                ))}
            </div>
        </div>
    )
}