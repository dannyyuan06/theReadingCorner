import Image from 'next/image'
import styles from './WithoutBookMessage.module.css'
import { MoreButton } from './MoreButton'

export function WithoutBookMessage() {

    return (
        <div className={styles.container}>
            <hr/>
            <div className={styles.userContainer}>
                <Image alt='profile picture placeholder' src="/images/profile_picture_placeholder.png" width={40} height={40}/>
                <div className={styles.userMeta}>
                    <div className={styles.userName}>Danny Yuan</div>
                    <div className={styles.userTimestamp}>Today at 18:31</div>
                </div>
                <MoreButton/>
            </div>
            <p className={styles.paragraphs}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    )
}