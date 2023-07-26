import BookSuggestion from "@/models/BookSuggestion";
import { BookAttackment } from "../components/BookAttachment";
import { PageHeader } from "../components/PageHeader";
import { GenreAttachment } from "../suggestions/GenreAttachment";
import { AStatistic } from "./AStatistic";
import styles from './page.module.css'
import GenreSuggestion from "@/models/GenreSuggestion";

const books = ["1", "2", "3"]
const genres = ["Romance", "Science Fiction", "Short Story", "Spirituality",]

export default async function clubStatistics() {
    const {books, genres} = await getBooks()


    return (
        <div className={styles.container}>
            <PageHeader>CLUB STATISTICS</PageHeader>
            <section>
                <h2 className={styles.titles}>QUICK STATS</h2>
                <AStatistic title="Currently Reading Book" value="The Google Story"/>
                <AStatistic title="Average Rating" value="7.8"/>
                <AStatistic title="Number of members" value="102"/>
                <AStatistic title="Number of Books read" value="4"/>
                <AStatistic title="Bulletin Engagement" value="60%"/>
            </section>
            <section>
                <h2 className={styles.titles}>SUGGESTED BOOKS</h2>
                <div>
                    {books.map((book, index) => (
                        <BookAttackment key={book.booksuggestionid} book={book.book} index={index}/>
                    ))}
                </div>
            </section>
            <section>
                <h2 className={styles.titles}>SUGGESTED GENRES</h2>
                    {genres.map((genre, index) => (
                        <GenreAttachment key={genre.genresuggestionid} genre={genre.genre} index={index}/>
                    ))}
            </section>
        </div>
    )
}

async function getBooks() {
    const books = await BookSuggestion.getSuggestions()
    const genres = await GenreSuggestion.getSuggestions()
    return {books, genres}
}