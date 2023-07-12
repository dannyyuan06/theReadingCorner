import Link from 'next/link'
import tStyles from './tiles.module.css'
import { AStatistic } from '../clubStatistics/AStatistic'

export function StatisticsTile() {
    return(
        <div>
            <Link href='/clubStatistics' className={tStyles.title}><h2>STATISTICS</h2></Link>
            <div className={tStyles.container}>
                <AStatistic title="Currently Reading Book" value="The Google Story"/>
                <AStatistic title="Average Rating" value="7.8"/>
                <AStatistic title="Number of members" value="102"/>
            </div>
        </div>
    )
}