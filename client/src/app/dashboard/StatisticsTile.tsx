import Link from 'next/link'
import tStyles from './tiles.module.css'
import { AStatistic } from '../clubStatistics/AStatistic'
import { StatsType } from '@/models/Pages'

export function StatisticsTile({stats}: {stats: StatsType}) {

    const displayAverageRating = stats.averageRating === -1 ? "-" : stats.averageRating.toFixed(2) ?? ""

    return(
        <div>
            <Link href='/clubStatistics' className={tStyles.title}><h2>STATISTICS</h2></Link>
            <div className={tStyles.container}>
                <AStatistic title="Currently Reading Book" value={stats.currentlyReadingBook}/>
                <AStatistic title="Average Rating" value={displayAverageRating}/>
                <AStatistic title="Number of members" value={stats.numberOfMembers.toString()}/>
                <AStatistic title="Books Read" value={stats.booksRead.toString()}/>
                <AStatistic title="Bulletin Board Engagement" value={stats.bulletinBoardEngagement.toFixed(2)}/>
            </div>
        </div>
    )
}