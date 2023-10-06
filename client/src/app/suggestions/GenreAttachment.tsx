import Image from 'next/image'
import styles from './GenreAttachment.module.css'
import { Dispatch, SetStateAction } from 'react'

export function GenreAttachment({genre, index, setGenres}: {genre: string, index: number, setGenres?: Dispatch<SetStateAction<string[]>>}) {
    const crosshandler = () => {
        setGenres!((prev: string[]) => prev.filter(val => val !== genre))
    }

    return (
        <>
            {index !== 0 && <hr/>}
            <div className={styles.genreContainer} data-testid="genre-attachment">
                <div className={styles.genresInfoTitle}>{genre}</div>
                {
                    setGenres && 
                    <button className={styles.cancelCross} onClick={crosshandler}>
                        <Image width={20} height={20} alt='cancel cross' src='/images/cross.svg'/>
                    </button>
                }
            </div>
        </>
    )
}