import { PageHeader } from '../../components/PageHeader'
import { BookSuggestionTile } from '../../dashboard/BookSuggestionTile'
import { CurrentlyReadingTile } from '../../dashboard/CurrentlyReadingTile'
import { MessagesTile } from '../../dashboard/MessagesTile'
import { StatisticsTile } from '../../dashboard/StatisticsTile'
import styles from '../page.module.css'

export const fetchCache = 'force-no-store';

export default function adminDashboard() {
  return (
    <div className={styles.container}>
      <PageHeader>DASHBOARD</PageHeader>
      <div className={styles.body}>
        <div className={styles.left}>
          <CurrentlyReadingTile/>
          <MessagesTile/>
        </div>
        <div className={styles.right}>
          <BookSuggestionTile/>
          <StatisticsTile/>
        </div>
      </div>
    </div>
  )
}
