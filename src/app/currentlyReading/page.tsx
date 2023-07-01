import { PageHeader } from "../components/PageHeader";
import { CurrentlyReadingBook } from "./CurrentlyReadingBook";
import { PastReadingBook } from "./PastReadingBook";
import styles from './page.module.css'



export default function currentlyReading() {
    return(
        <div>
            <PageHeader>CURRENTLY READING</PageHeader>
            <CurrentlyReadingBook/>
            <h2 className={styles.previousBooks}>PREVIOUS BOOKS</h2>
            <PastReadingBook/>
            <PastReadingBook/>
            <PastReadingBook/>
            <PastReadingBook/>
        </div>
    )
}