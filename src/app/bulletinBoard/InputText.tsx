'use client'
import { ClipboardEvent, useState } from 'react'
import styles from './InputText.module.css'
import Image from 'next/image'
import { AddBook } from './AddBook'

export function InputText() {
    
    const [textContent, setTextContent] = useState("")
    const [didAddBook, setDidAddBook] = useState(false)

    const pasteHandler = (e:ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        const text = e.clipboardData.getData("text/plain")
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
    
    return (
        <div className={styles.container}>
            <div className={styles.textWithProfile}>
                <Image alt="profile picture placeholder" src="/images/profile_picture_placeholder.png" width={50} height={50}/>
                <div className={styles.textInputContainer}>
                    <div contentEditable
                            className={styles.newMessageInput}
                            onInput={e => setTextContent(e.currentTarget.textContent ? e.currentTarget.textContent : "")}
                            onPaste={pasteHandler}>
                    </div>
                    {textContent === "" && <div className={styles.placeholder + " " + styles.newMessageInput}>
                            What's new?
                        </div>}
                    <div className={styles.extraInfoContainer}>
                        <div className={styles.wordCount}>
                            {textContent.length}/5000
                        </div>
                        <div className={styles.sendToolbar}>
                            <button className={styles.toolbarButton} onClick={() => setDidAddBook(true)}>
                                <Image width={30} height={30} alt='book attachment icon' src='/images/book_icon.svg'/>
                            </button>
                            <button className={styles.toolbarButton}>
                                <Image width={30} height={30} alt='image attachment icon' src='/images/image_icon.svg'/>
                            </button>
                            <button className={styles.toolbarButton}>
                                <span style={{marginBottom: 6}}>@</span>
                            </button>
                            <button className={styles.toolbarSendButton + (textContent === "" ? " " + styles.toolbarButtonCant : "")} >
                                SEND
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {didAddBook && <AddBook setDidAddBook={setDidAddBook}/>}
        </div>
    )
}

