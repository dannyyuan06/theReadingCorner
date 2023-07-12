import { PageHeader } from "../components/PageHeader";
import { PastReadingBook } from "./PastReadingBook";
import { CurrentlyReadingBook } from "./CurrentlyReadingBook";
import styles from './page.module.css'



export default function currentlyReading() {
    return(
        <div>
            <PageHeader>CURRENTLY READING</PageHeader>
            <CurrentlyReadingBook book="7"/>
            <h2 className={styles.previousBooks}>PREVIOUS BOOKS</h2>
            <PastReadingBook book="6"/>
            <PastReadingBook book="5"/>
            <PastReadingBook book="4"/>
            <PastReadingBook book="3"/>
        </div>
    )
}