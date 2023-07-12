'use client'
import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from "react"
import { PageHeader } from "../components/PageHeader"
import styles from "./AddBook.module.css"
import { booksWithTitles } from "../bulletinBoard/books"

export function AddBook({setDidAddBook, setBooks}: {setDidAddBook: Dispatch<SetStateAction<boolean>>, setBooks: Dispatch<SetStateAction<string[]>>}) {
    const [selectedBook, setSelectedBook] = useState<string|null>(null)
    const [noBookSelected, setNoBookSelected] = useState(-1)

    useEffect(() => {
        selectedBook === null ? setNoBookSelected(p => p !== -1 ? 0 : -1) : setNoBookSelected(p => p !== -1 ? 1 : -1)
    },[selectedBook])

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        selectedBook === null ? setNoBookSelected(0) : setNoBookSelected(1)
        if (selectedBook !== null) {
            setBooks(prev => [...prev, selectedBook!])
            setDidAddBook(false)
        }
    }

    const cancelHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        setDidAddBook(false)
    }

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <PageHeader>ADD BOOK</PageHeader>
                <form className={styles.form} onSubmit={submitHandler}>
                    <label htmlFor="bname">Book Name</label>
                    <input type="text" name="bname"/>
                    <label htmlFor="lname">Author</label>
                    <input type="text" name="lname"/>
                    <div className={styles.booksDropDown}>
                        <DropDownMenu buttons={booksWithTitles} setSelectedBook={setSelectedBook} selectedBook={selectedBook}/>
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

function DropDownMenu({selectedBook, buttons, setSelectedBook}: {selectedBook: string|null, buttons: {[id: string]: string}, setSelectedBook: Dispatch<SetStateAction<string|null>>}) {

    return (
        <div className={styles.dropContainer} >
            {Object.keys(buttons).map((button: string) => <DropDownMenuButton key={button} name={buttons[button]} bookId={button} setSelectedBook={setSelectedBook} selectedBook={selectedBook}/>)}
        </div>
    )
}

function DropDownMenuButton({ name, setSelectedBook, bookId, selectedBook}: {name: string, setSelectedBook: Dispatch<SetStateAction<string|null>>, bookId: string, selectedBook: string|null}) {

    const clickHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        setSelectedBook(bookId)
    }

    return (
        <button style={selectedBook === bookId ? {backgroundColor: 'var(--theme-blue)', color: 'white'}: {}} className={styles.button} onClick={clickHandler}>
            <span>{name}</span>
        </button>
    )
}