'use client'
import { ClipboardEvent, useState } from 'react'
import styles from './InputText.module.css'
import Image from 'next/image'
import { AddBook } from './AddBook'
import { BookAttackment } from './BookAttachment'

export function InputText() {

    const textCap = 5000
    
    const [textContent, setTextContent] = useState("")
    const [didAddBook, setDidAddBook] = useState(false)
    const [books, setBooks] = useState<string[]>([])

    const pasteHandler = (e:ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        const text = e.clipboardData.getData("text/plain")
        if (text.length + textContent.length < textCap) {   
            const range = document.getSelection()!.getRangeAt(0);
            range.deleteContents();

            const textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);

            const selection = window.getSelection();
            selection!.removeAllRanges();
            selection!.addRange(range);
            setTextContent(e.currentTarget.textContent || "")
        }
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.textWithProfile}>
                <Image alt="profile picture placeholder" src="/images/profile_picture_placeholder.png" width={50} height={50}/>
                <div className={styles.textInputContainer}>
                    <div contentEditable
                            className={styles.newMessageInput}
                            style={textContent.length > textCap ? {color: 'red'}:{}}
                            onInput={(e) => setTextContent(e.currentTarget.textContent ? e.currentTarget.textContent : "")}
                            onPaste={pasteHandler}>
                    </div>
                    {textContent === "" && <div className={styles.placeholder + " " + styles.newMessageInput}>
                            What&apos;s new?
                        </div>}
                    <div className={styles.extraInfoContainer}>
                        <div className={styles.wordCount}>
                            <span style={textContent.length > textCap ? {color: 'red'}:{}}>{textContent.length}</span>
                            
                            /{textCap}
                        </div>
                        <div className={styles.booksContainer}>
                            {books.map((book: string, index:number) => (
                                <BookAttackment key={book} book={book} index={index} setBooks={setBooks}/>
                            ))}
                        </div>
                        <div className={styles.sendToolbar}>
                            <button className={styles.toolbarButton} onClick={() => setDidAddBook(true)}>
                                <Image width={30} height={30} alt='book attachment icon' src='/images/book_icon.svg'/>
                            </button>
                            <button className={styles.toolbarButton}>
                                <span style={{marginBottom: 6}}>@</span>
                            </button>
                            <button className={styles.toolbarSendButton + (textContent === "" || textContent.length > textCap ? " " + styles.toolbarButtonCant : "")} >
                                SEND
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {didAddBook && <AddBook setDidAddBook={setDidAddBook} setBooks={setBooks}/>}
        </div>
    )
}

