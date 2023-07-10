import styles from './SmallBook.module.css'
import { bookexample } from '@/app/bookexample'
import { DispatchLink } from '@/app/components/DispatchLink'
import Image from 'next/image'

export function SmallBook({ book }: { book: string}) {

    function cut(str: string, length: number) {
        return str.length > length ? str.substring(0, length - 4) + '...' : str
    }

    return (
        <div className={styles.container}>
            <DispatchLink link={`/books/${book}`}>
                <Image alt="book placeholder" src={bookexample[book].volumeInfo.imageLinks.small} width={60} height={85} style={{objectFit: 'contain'}}/>
            </DispatchLink>
            <div className={styles.textContainer}>
                <div className={styles.headerBodySeparator}>
                    <div className={styles.titles}>
                        <DispatchLink link={`/books/${book}`}><h3 className={styles.title}>{cut(bookexample[book].volumeInfo.title, 20)}</h3></DispatchLink>
                        <h3>AUTHOR: {cut(bookexample[book].volumeInfo.authors.join(", "), 25)}</h3>
                        <h3>START DATE: <span>04/05/2020</span></h3>
                        <h3>GENRE: {cut(bookexample[book].volumeInfo.mainCategory, 25)}</h3>
                    </div>
                    <div className={styles.progress}>
                        <h3 style={{flex: 1}}>PROGRESS</h3>
                        <div className={styles.progressOutline}>
                            <div className={styles.progressLine}>

                            </div>
                        </div>
                        <div className={styles.progressText}>
                            Reading  
                            <span> 6</span><span style={{color: 'var(--theme-light-grey)'}}>/11 </span>
                            pages
                        </div>
                    </div>
                    <div className={styles.scoreContainer}>
                        <div className={styles.scoreWrapper}>
                            <h3>SCORED</h3>
                            <div className={styles.displayScore}>8.4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}