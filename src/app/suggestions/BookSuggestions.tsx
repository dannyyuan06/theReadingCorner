'use client'
import { useState } from 'react'
import styles from './Suggestions.module.css'
import { AddBook } from '../components/AddBook'
import { BookAttackment } from '../components/BookAttachment'

export function BookSuggestions() {

    const [didAddBook, setDidAddBook] = useState(false)
    const [books, setBooks] = useState<string[]>([])
    return (
        <div className={styles.container}>
            <h2>BOOK SUGGESTION</h2>
            <div className={styles.booksContainer}>
                {books.map((book: string, index:number) => (
                    <BookAttackment key={book} book={book} index={index} setBooks={setBooks}/>
                ))}
            </div>
            <button className={styles.addButton} onClick={() => setDidAddBook(true)}>ADD BOOK</button>
            <button className={styles.submitButton} style={books.length === 0 ? {backgroundColor: "var(--theme-light-light-grey)", color: 'black'}: {}}>SUBMIT</button>
            {didAddBook && <AddBook setDidAddBook={setDidAddBook} setBooks={setBooks}/>}
        </div>
    )
}