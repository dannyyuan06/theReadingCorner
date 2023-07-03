import Image from 'next/image'
import styles from './BookAttachment.module.css'
import { allBooks } from './books'
import { Dispatch, SetStateAction } from 'react'

export function BookAttackment({book, index, setBooks}: {book: string, index: number, setBooks?: Dispatch<SetStateAction<string[]>>}) {
    const crosshandler = () => {
        setBooks!((prev: string[]) => {
            let prevCopy:string[] = JSON.parse(JSON.stringify(prev))
            for (let i=0;i<prevCopy.length;i++) {
                if (prevCopy[i] === book) {
                    prevCopy.splice(i,1)
                }
            }
            return prevCopy
        })
    }

    return (
        <>
            {index !== 0 && <hr/>}
            <div className={styles.bookContainer}>
                <Image style={{objectFit: 'contain', flex: 1}} width={40} height={60} alt='book placeholder' src='/images/book-placeholder.png'/>
                <div className={styles.booksInfoTitleAuthor}>
                    <div className={styles.booksInfoTitle}>{allBooks[book]}</div>
                    <div className={styles.booksInfoAutho}>Some Author</div>
                </div>
                <div className={styles.booksInfoBlurb}>aidshfaush oiuahsofiuahs ofiahs oidfhaoisdfhaoisudfgoiausgdfoiag sdioufgaoisd fgoiausd faiudgshfoia sdoifaoidsfh oiadh fo iah sdof hpaosid hfpoa </div>
                <div></div>
                {
                    setBooks && 
                    <button className={styles.cancelCross} onClick={crosshandler}>
                        <Image width={20} height={20} alt='cancel cross' src='/images/cross.svg'/>
                    </button>
                }
            </div>
        </>
    )
}