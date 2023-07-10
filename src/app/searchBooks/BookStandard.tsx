import Image from "next/image";
import styles from './BookStandard.module.css'

type props = {
    bookTitle: string,
    authors: string,
    datePublished: string,
    genre: string,
    image: string
}

export function BookStandard({bookTitle, authors, datePublished, genre, image}: props) {

    return (
        <>
            <hr/>
            <div className={styles.container}>
                <img alt='book image' src={image} width={70} height={100}/>
                <h3 style={{flex: 2}}>{bookTitle}</h3>
                <h3 style={{flex: 2}}>{authors}</h3>
                <h3 style={{flex: 1}}>{datePublished}</h3>
                <h3 style={{flex: 2}}>{genre}</h3>
            </div>
        </>
        
    )
}