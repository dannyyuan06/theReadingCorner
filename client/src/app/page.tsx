import Link from 'next/link'
import { PageHeader } from './components/PageHeader'
import { SignInButton } from './components/SignInButton'
import { BookSuggestionTile } from './dashboard/BookSuggestionTile'
import { CurrentlyReadingTile } from './dashboard/CurrentlyReadingTile'
import { MessagesTile } from './dashboard/MessagesTile'
import { StatisticsTile } from './dashboard/StatisticsTile'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <PageHeader>WECOME TO THE READING CORNER</PageHeader>
      <SignInButton/>
      <Link href="/register">Register</Link>
    </div>
  )
}
