import Pages from '@/models/Pages'
import { PageHeader } from '../../components/PageHeader'
import { BookSuggestionTile } from '../../dashboard/BookSuggestionTile'
import { CurrentlyReadingTile } from '../../dashboard/CurrentlyReadingTile'
import { MessagesTile } from '../../dashboard/MessagesTile'
import { StatisticsTile } from '../../dashboard/StatisticsTile'
import { ReportMessagesTile } from '../ReportedTile'
import styles from '../page.module.css'

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default async function adminDashboard() {

  const [tileData, err] = await Pages.dashboardAdmin()

  if (!tileData) return (
    <div>
      <PageHeader>Error</PageHeader>
      Error: {err}
    </div>
  )

  return (
    <div className={styles.container}>
      <PageHeader>DASHBOARD</PageHeader>
      <div className={styles.body}>
        <div className={styles.left}>
          <ReportMessagesTile reportedMessages={tileData.reportedMessages}/>
          <CurrentlyReadingTile currentlyReading={tileData.currentlyReadingBook}/>
          <MessagesTile messages={tileData.messages} />
        </div>
        <div className={styles.right}>
          <BookSuggestionTile bookSuggestions={tileData.bookSuggestions}/>
          <StatisticsTile stats={tileData.stats}/>
        </div>
      </div>
    </div>
  )
}
