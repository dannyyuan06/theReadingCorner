import { PageHeader } from '../components/PageHeader'
import { CurrentlyReadingTile } from '../dashboard/CurrentlyReadingTile'
import { MessagesTile } from '../dashboard/MessagesTile'
import styles from './page.module.css'

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className={styles.container}>
      <PageHeader>DASHBOARD</PageHeader>
      <div className={styles.body}>
        <div className={styles.left}>
          <CurrentlyReadingTile/>
          <MessagesTile/>
        </div>
      </div>
    </div>
  )
}
