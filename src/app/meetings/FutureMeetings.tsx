import Image from 'next/image'
import styles from './FutureMeetings.module.css'

export function FutureMeeting() {
    return (
        <div className={styles.container}>
            <Image alt="book placeholder" src={"/images/meetings_placeholder.png"} width={200} height={155} style={{objectFit: 'contain', flex: 2}}/>
            <div className={styles.titles}>
                    <h2 className={styles.title}>BOOK PLACEHOLDER</h2>
                    <h3>HOST: <span>Random person</span></h3>
                    <h3>DATE: <span>04/05/2020</span></h3>
                    <h3>TIME: <span>14:20</span></h3>
                    <h3>LINK: <span><a href='https://zoom.us/j/5551112222'>https://zoom.us/j/5551112222</a></span></h3>
                </div>
                <div className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </div>
        </div>
    )
}