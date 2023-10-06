import Image from 'next/image'
import styles from './Loading.module.css'


export default function Loading() {
    return (
        <div className={styles.container} data-testid="loading">
            <div className={styles.wrapper}>
                <Image src='/images/TRC_Icon_01_Light_RGB.svg' alt='loading' width={100} height={100}/>
            </div>
        </div>
    )
}