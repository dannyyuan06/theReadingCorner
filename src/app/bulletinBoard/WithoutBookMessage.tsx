import Image from 'next/image'
import styles from './WithoutBookMessage.module.css'
import { BookAttackment } from './BookAttachment'
import { ProfileMini } from '../components/ProfileMini'
import { MoreButton } from '../components/MoreButton'

export function WithoutBookMessage({books}: {books?: string[]}) {

    return (
        <div className={styles.container}>
            <hr/>
            <div className={styles.userContainer}>
                <ProfileMini/>
                <MoreButton buttons={["Reply", "Save", "Share", "Report"]}/>
            </div>
            <p className={styles.paragraphs}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className={styles.booksContainer}>
                {books?.map((book: string, index: number) => (
                    <BookAttackment book={book} index={index}/>
                ))}
            </div>
        </div>
    )
}