import Link from 'next/link'
import { WithoutBookMessage } from '../bulletinBoard/WithoutBookMessage'
import tStyles from './tiles.module.css'

export function MessagesTile() {
    return(
        <div>
            <Link href='/bulletinBoard' className={tStyles.title}><h2>RECENT MESSAGES</h2></Link>
            <div className={tStyles.container}>
                <WithoutBookMessage/>
                <WithoutBookMessage/>
            </div>
        </div>
    )
}