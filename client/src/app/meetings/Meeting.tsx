import Image from "next/image";
import styles from "./Meeting.module.css"


export function Meeting() {
    return (
        <div className={styles.container}>
            <Image alt="book placeholder" src={"/images/meetings_placeholder.png"} width={550} height={330} style={{objectFit: 'contain'}}/>
            <div className={styles.textContainer}>
                <div className={styles.headerBodySeparator}>
                    <div className={styles.titles}>
                        <h2>MEETING TITLE</h2>
                        <h3>HOST: <span>Random Person</span></h3>
                        <h3>DATE: <span>04/05/2020</span></h3>
                        <h3>TIME: <span>15:40</span></h3>
                        <h3>LINK: <span><a href="https://zoom.us/j/5551112222">https://zoom.us/j/5551112222</a></span></h3>
                    </div>
                </div>
                <div className={styles.bodyWrapper}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </div>
            </div>
        </div>
    )
}