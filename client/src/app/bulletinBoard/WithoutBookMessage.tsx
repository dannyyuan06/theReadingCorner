'use client'
import styles from './WithoutBookMessage.module.css'
import { ProfileMini } from '../components/ProfileMini'
import { MoreButton } from '../components/MoreButton'
import { BookAttackment } from '../components/BookAttachment'
import { Book } from '@prisma/client'
import { getMessagesType } from '@/models/BulletinBoard'
import { getLastOnlineStatus } from './getOnlineStatus'
import { useState } from 'react'
import { Popup } from '../components/Popup'
import { useSession } from 'next-auth/react'

export function WithoutBookMessage({message}: {message: getMessagesType}) {

    const [copied, setCopied] = useState(false)
    const [reported, setReported] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [unreported, setUnreported] = useState(false)
    const { data }:any = useSession()

    const share = () => {
        const shareText = `Hi, look at this post on The Reading Corner: ${window.location.href}#${message.messageid}`;
        navigator.clipboard.writeText(shareText).then(() => {
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        })
    }

    const report = () => {
        fetch(`/api/bulletinBoard/reportMessage/${message.messageid}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            setReported(false)
        })
    }

    const allow = () => {
        fetch(`/api/bulletinBoard/unreportMessage/${message.messageid}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            setUnreported(false)
        })
    }

    const deleteMessage = () => {
        fetch(`/api/bulletinBoard/deleteMessage/${message.messageid}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            setDeleted(false)
        })
    }

    let buttons:{[id: string]: () => void} = {
        "Share": share, 
    }

    if (data?.accessLevel === 3) {
        if (message.reported) buttons["Un-report"] = () => {setUnreported(true)};
        buttons["Delete"] = () => {setDeleted(true)};
    }
    else buttons["Report"] = () => {setReported(true)};

    return (
        <>
            <div className={styles.container} id={`${message.messageid}`}>
                {copied && <div className={styles.copied}>Copied to clipboard</div>}
                <hr/>
                <div className={styles.userContainer}>
                    <ProfileMini user={message.user} dateSent={getLastOnlineStatus(new Date(message.dateCreated))}/>
                    <MoreButton buttons={buttons}/>
                </div>
                <p className={styles.paragraphs}>
                        {message.body}
                    </p>
                <div className={styles.booksContainer}>
                        {message.books.map(({book}: {book: Book}, index: number) => (
                            <BookAttackment key={book.bookid} book={book} index={index}/>
                        ))}
                    </div>
            </div>
            {reported
            && <Popup title='CONFIRMATION' setClicked={setReported} confirm={report}>
                Are you sure you want to report this to an administrator?
            </Popup>
            }
            {unreported
            && <Popup title='CONFIRMATION' setClicked={setUnreported} confirm={allow}>
                Are you sure you want to allow this message?
            </Popup>
            }
            {deleted
            && <Popup title='CONFIRMATION' setClicked={setDeleted} confirm={deleteMessage}>
                Are you sure you want to delete this message?
            </Popup>
            }
        </>
    )
}