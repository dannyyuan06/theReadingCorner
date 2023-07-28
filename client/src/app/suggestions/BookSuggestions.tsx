'use client'
import { useState } from 'react'
import styles from './Suggestions.module.css'
import { AddBook } from '../components/AddBook'
import { BookAttackment } from '../components/BookAttachment'
import { Book } from '@prisma/client'
import { useSession } from 'next-auth/react'

export function BookSuggestions() {

    const [didAddBook, setDidAddBook] = useState(false)
    const [books, setBooks] = useState<Book[]>([])
    const { data }:any = useSession()

    const onSubmit = async () => {
        const res = await fetch("/api/bookSuggestions", {
            method: 'POST',
            body: JSON.stringify(books.map((book) => ({bookid: book.bookid, username:data?.username}))),
            headers: { "Content-Type": "application/json" }
        })
        const body = await res.json()
        console.log(body)
        setBooks([])
    }

    return (
        <div className={styles.container}>
            <h2>BOOK SUGGESTION</h2>
            <div className={styles.booksContainer}>
                {books.map((book: Book, index:number) => (
                    <BookAttackment key={book.bookid} book={book} index={index} setBooks={setBooks}/>
                ))}
            </div>
            <button className={styles.addButton} onClick={() => setDidAddBook(true)}>ADD BOOK</button>
            <button className={styles.submitButton} onClick={onSubmit} style={books.length === 0 ? {backgroundColor: "var(--theme-light-light-grey)", color: 'black'}: {}}>SUBMIT</button>
            {didAddBook && <AddBook setDidAddBook={setDidAddBook} setBooks={setBooks}/>}
        </div>
    )
}