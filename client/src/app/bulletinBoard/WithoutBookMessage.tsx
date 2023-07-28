import styles from './WithoutBookMessage.module.css'
import { ProfileMini } from '../components/ProfileMini'
import { MoreButton } from '../components/MoreButton'
import { BookAttackment } from '../components/BookAttachment'
import { Book } from '@prisma/client'
import { getMessagesType } from '@/models/BulletinBoard'
import { getLastOnlineStatus } from './getOnlineStatus'



export function WithoutBookMessage({message}: {message: getMessagesType}) {
    return (
        <div className={styles.container}>
            <hr/>
            <div className={styles.userContainer}>
                <ProfileMini name={message.username} lastOnline={getLastOnlineStatus(new Date(message.dateCreated))} picture={message.user.profilePicture}/>
                <MoreButton buttons={["Reply", "Save", "Share", "Report"]}/>
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
    )
}