import Pages from '@/models/Pages';
import { PageHeader } from '../components/PageHeader'
import { CurrentlyReadingTile } from '../dashboard/CurrentlyReadingTile'
import { MessagesTile } from '../dashboard/MessagesTile'
import styles from './page.module.css'

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default async function Home() {

  const [tileData, err] = await Pages.dashboard()

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
          <CurrentlyReadingTile currentlyReading={tileData.currentlyReadingBook}/>
          <MessagesTile messages={tileData.messages} />
        </div>
      </div>
    </div>
  )
}