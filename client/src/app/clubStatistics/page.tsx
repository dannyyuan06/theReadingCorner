import { BookAttackment } from "../components/BookAttachment";
import { PageHeader } from "../components/PageHeader";
import { GenreAttachment } from "../suggestions/GenreAttachment";
import { AStatistic } from "./AStatistic";
import UpdateButton from "./UpdateButton";
import styles from './page.module.css'
import Pages from "@/models/Pages";

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default async function clubStatistics() {
    const [allData, err] = await getStats()
    if (!allData) return (
        <div>
            <PageHeader>ERROR OCCURED</PageHeader>
            Error: {err}
        </div>
    )

    const { currentlyReadingBook, bookSuggestions, genreSuggestions, numberOfMembers, booksRead, bulletinEngagement } = allData

    const displayAverageRating = currentlyReadingBook?.book.averageRating === -1 ? "No Readers" : currentlyReadingBook?.book.averageRating.toFixed(2) ?? ""

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <PageHeader>CLUB STATISTICS</PageHeader>
                <UpdateButton/>
            </div>
            <section>
                <h2 className={styles.titles}>QUICK STATS</h2>
                <AStatistic title="Currently Reading Book" value={currentlyReadingBook?.book.title ?? ""}/>
                <AStatistic title="Average Rating" value={displayAverageRating}/>
                <AStatistic title="Number of members" value={numberOfMembers.toString()}/>
                <AStatistic title="Number of Books read" value={booksRead.toString()}/>
                <AStatistic title="Bulletin Engagement" value={`${(bulletinEngagement*100).toFixed(1)}%`}/>
            </section>
            <section>
                <h2 className={styles.titles}>SUGGESTED BOOKS</h2>
                <div>
                    {bookSuggestions.map((book, index) => (
                        <BookAttackment key={book.bookid} book={book.book} index={index}/>
                    ))}
                </div>
            </section>
            <section>
                <h2 className={styles.titles}>SUGGESTED GENRES</h2>
                    {genreSuggestions.map((genre, index) => (
                        <GenreAttachment key={genre.genresuggestionid} genre={genre.genre} index={index}/>
                    ))}
            </section>
        </div>
    )
}

async function getStats() {
    const allData = Pages.statistics()
    return allData
}