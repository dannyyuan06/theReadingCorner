import { PageHeader } from "../components/PageHeader";
import { PastReadingBook } from "./PastReadingBook";
import { CurrentlyReadingBook } from "./CurrentlyReadingBook";
import styles from './page.module.css'
import { CurrentlyReading } from "@/models/CurrentlyReading";

// Each page is usually cached but this forces it to fetch new
// data each time
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store';

export default async function currentlyReading() {
    const books = await getCurrentlyReadingBooks()
    // If there are no currently reading books in database
    if (books.length === 0) {
        return (
            <div>
                <PageHeader>CURRENTLY READING</PageHeader>
                <h2>Nothing to see here</h2>
            </div>
        )
    }
    // split the books into previous and current books
    const [currentlyReadingBook, ...theRest] = books
    return(
        <div>
            <PageHeader>CURRENTLY READING</PageHeader>
            <CurrentlyReadingBook currentlyReading={currentlyReadingBook}/>
            {theRest.length !== 0 &&
                <h2 className={styles.previousBooks}>PREVIOUS BOOKS</h2>
            }
            {theRest.map(currentlyReading => (
                <PastReadingBook
                    key={currentlyReading.readid}
                    currentlyReading={currentlyReading}
                />
            ))}
        </div>
    )
}

// When rendered on server side, get the books from the database.
// No need to call a lambda function as it itself is a serverless function
async function getCurrentlyReadingBooks() {
    const [books, err] = await CurrentlyReading.getCurrentlyReadingBooks()
    return books ?? []
}