'use client'
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from "react"
import { PageHeader } from "../components/PageHeader"
import styles from "./AddBook.module.css"
import { BookType } from "../bookexample"
import { Book } from "@prisma/client"
import Image from "next/image"

let timer:ReturnType<typeof setTimeout> | null

export function AddBook({setDidAddBook, setBooks}: {setDidAddBook: Dispatch<SetStateAction<boolean>>, setBooks: Dispatch<SetStateAction<Book[]>>}) {
    const [selectedBook, setSelectedBook] = useState<BookType|null>(null)
    const [noBookSelected, setNoBookSelected] = useState(-1)
    const [booksQueried, setBooksQueried] = useState<BookType[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        selectedBook === null ? setNoBookSelected(p => p !== -1 ? 0 : -1) : setNoBookSelected(p => p !== -1 ? 1 : -1)
    },[selectedBook])

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        selectedBook === null ? setNoBookSelected(0) : setNoBookSelected(1)
        if (selectedBook !== null) {
            fetch("/api/bookDatabase/addBook", {
                method: 'POST',
                body: JSON.stringify(selectedBook),
                headers: { "Content-Type": "application/json" }
            })
            .then((res) => res.json())
            .then(body => {
                setBooks(prev => [...prev, body!])
                setDidAddBook(false)
            })
        }
    }

    const cancelHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        setDidAddBook(false)
    }

    const inputHander = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer ?? "")
        setLoading(true)
        timer = setTimeout(() => {
            setLoading(false)
            fetch(`/api/books/${e.target.value}`,{
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(body => {
                setBooksQueried(body)
            })
        }, 500)
    }

    return(
        <div className={styles.container} data-testid="add-book">
            <div className={styles.wrapper}>
                <PageHeader>ADD BOOK</PageHeader>
                <form className={styles.form} onSubmit={submitHandler}>
                    <label htmlFor="bname">Search</label>
                    <input onChange={inputHander} type="text" name="bname" autoComplete="off"/>
                    <div className={styles.booksDropDown}>
                        <DropDownMenu books={booksQueried} setSelectedBook={setSelectedBook} selectedBook={selectedBook}/>
                        {loading
                        && <div className={styles.loadingContainer}>
                            <div className={styles.loading}>
                                <Image src='/images/TRC_Icon_01_Light_RGB.svg' width={30} height={30} alt="loading"/>
                            </div>
                        </div>
                        }
                    </div>
                    <div className={styles.finishButtons}>
                        <div className={styles.notSelectedBook}>{noBookSelected === 0 && "Please select a book"}</div>
                        <button className={styles.cancelButton} onClick={cancelHandler}>Cancel</button>
                        <input className={styles.submitButton} type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

function DropDownMenu({selectedBook, books, setSelectedBook}: {selectedBook: BookType|null, books: BookType[], setSelectedBook: Dispatch<SetStateAction<BookType|null>>}) {

    return (
        <div className={styles.dropContainer} >
            {books.map((book: BookType) => <DropDownMenuButton key={book.id}  setSelectedBook={setSelectedBook} book={book} selectedBook={selectedBook}/>)}
        </div>
    )
}

function DropDownMenuButton({ setSelectedBook, book, selectedBook}: {setSelectedBook: Dispatch<SetStateAction<BookType|null>>, book: BookType, selectedBook: BookType|null}) {

    const clickHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        setSelectedBook(book)
    }

    const isSameBook = (selectedBook ? selectedBook.id : "")  === book.id

    return (
        <button key={book.id} style={isSameBook ? {backgroundColor: 'var(--theme-blue)', color: 'white'}: {}} className={styles.button} onClick={clickHandler}>
            <span>{book.volumeInfo.title}</span>
        </button>
    )
}