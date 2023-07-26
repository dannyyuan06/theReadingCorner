import Link from 'next/link'
import { BookAttackment } from '../components/BookAttachment'
import tStyles from './tiles.module.css'
import BookSuggestion from '@/models/BookSuggestion'

//const books = ["1" , "2", "3", "4"]

export async function BookSuggestionTile() {
    const books = await getBooks()
    return (
        <div>
            <Link href='/suggestions' className={tStyles.title}><h2>BOOK SUGGESTIONS</h2></Link>
            <div className={tStyles.container}>
                {books.map((book, index) => (
                    <BookAttackment key={book.booksuggestionid} book={book.book} index={index}/>
                ))}
            </div>
        </div>
    )
}

async function getBooks() {
    const books = await BookSuggestion.getSuggestions()
    return books
}