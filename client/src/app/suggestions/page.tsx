import { PageHeader } from '../components/PageHeader'
import { BookSuggestions } from './BookSuggestions'
import { GenreSuggestions } from './GenreSuggestions'
import styles from './page.module.css'

export default function suggestions() {
    return (
        <div>
            <PageHeader>SUGGESTIONS</PageHeader>
            <div className={styles.suggestions}>
                <BookSuggestions/>
                <hr/>
                <GenreSuggestions/>
            </div>
        </div>
    )
}