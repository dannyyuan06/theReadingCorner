import { PageHeader } from "../components/PageHeader";
import { PastReadingBook } from "./PastReadingBook";
import { CurrentlyReadingBook } from "./CurrentlyReadingBook";
import styles from './page.module.css'
import { CurrentlyReading } from "@/models/CurrentlyReading";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store';

export default async function currentlyReading() {
    const books = await getCurrentlyReadingBooks()

    if (books.length === 0) {
        return (
            <div>
                <PageHeader>CURRENTLY READING</PageHeader>
                <h2>Nothing to see here</h2>
            </div>
        )
    }
    const [currentlyReadingBook, ...theRest] = books
    return(
        <div>
            <PageHeader>CURRENTLY READING</PageHeader>
            <CurrentlyReadingBook currentlyReading={currentlyReadingBook}/>
            {theRest.length !== 0 && <h2 className={styles.previousBooks}>PREVIOUS BOOKS</h2>}
            {theRest.map(currentlyReading => (
                <PastReadingBook key={currentlyReading.readid} currentlyReading={currentlyReading}/>
            ))}
        </div>
    )
}

async function getCurrentlyReadingBooks() {
    const [books, err] = await CurrentlyReading.getCurrentlyReadingBooks()
    return books ?? []
}