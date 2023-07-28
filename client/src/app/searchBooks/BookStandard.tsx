import Image from "next/image";
import styles from './BookStandard.module.css'
import Link from "next/link";

type props = {
    bookId: string,
    bookTitle: string,
    authors: string,
    datePublished: string,
    genre: string,
    image: string
}

export function BookStandard({bookId, bookTitle, authors, datePublished, genre, image}: props) {

    return (
        <>
            <hr/>
            <Link className={styles.container} href={`books/${bookId}`}>
                <Image alt='book image' src={image} width={50} height={70} style={{boxShadow: 'var(--shadow-button-color)'}}/>
                <h3 style={{flex: 2}} className={styles.title}>{bookTitle}</h3>
                <h3 style={{flex: 2}}>{authors}</h3>
                <h3 style={{flex: 1}}>{datePublished}</h3>
                <h3 style={{flex: 2}}>{genre}</h3>
            </Link>
        </>
        
    )
}