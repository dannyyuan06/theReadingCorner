'use client'
import { ClipboardEvent, useRef, useState } from 'react'
import styles from './InputText.module.css'
import Image from 'next/image'
import { AddBook } from '../components/AddBook'
import { BookAttackment } from '../components/BookAttachment'
import { useSession } from 'next-auth/react'
import { io, type Socket } from "socket.io-client";
import type {
    ServerToClientEvents,
    ClientToServerEvents,
  } from './socketTypes'
import { Book, BulletinBoardBooks, BulletinBoardMessages } from '@prisma/client'
import { messagePropType } from './Messages'
import { BookType } from '../bookexample'
import { messagesWithBook } from '@/models/BulletinBoard'

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

const textCap = 5000

export function InputText() {

    const [textContent, setTextContent] = useState("")
    const [didAddBook, setDidAddBook] = useState(false)
    const [books, setBooks] = useState<Book[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const {data}: any = useSession()

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

    const clickHandler = async () => {
        socket = io(process.env.NEXT_PUBLIC_BULLETINBOARD_HOST!)
        const message = {
            body: textContent,
            username: data?.username,
            books: books,
        }
        const res = await fetch(process.env.NEXT_PUBLIC_HOST + "api/bulletinBoard/addMessage", {
            method: 'POST',
            body: JSON.stringify({message: message}),
            headers: { "Content-Type": "application/json" }
        })
        const body = await res.json()
        socket.emit("message", {
            ...message, 
            user: data!, 
            messageid: body.messageid, 
            books: books.map(book => ({book})),
            dateCreated: new Date()
        })
        setTextContent("")
        setDidAddBook(false)
        setBooks([])
        inputRef.current!.textContent = ""
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.textWithProfile}>
                <Image alt="profile picture placeholder" src="/images/profile_picture_placeholder.png" width={50} height={50}/>
                <div className={styles.textInputContainer}>
                    <div  contentEditable
                            className={styles.newMessageInput}
                            style={textContent.length > textCap ? {color: 'red'}:{}}
                            onInput={(e) => setTextContent(e.currentTarget.textContent ? e.currentTarget.textContent : "")}
                            onPaste={pasteHandler}
                            ref={inputRef}>
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
                            {books.map((book: Book, index:number) => (
                                <BookAttackment key={book.bookid} book={book} index={index} setBooks={setBooks}/>
                            ))}
                        </div>
                        <div className={styles.sendToolbar}>
                            <button className={styles.toolbarButton} onClick={() => setDidAddBook(true)}>
                                <Image width={30} height={30} alt='book attachment icon' src='/images/book_icon.svg'/>
                            </button>
                            <button className={styles.toolbarButton}>
                                <span style={{marginBottom: 6}}>@</span>
                            </button>
                            <button onClick={clickHandler} className={styles.toolbarSendButton + (textContent === "" || textContent.length > textCap ? " " + styles.toolbarButtonCant : "")} >
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

