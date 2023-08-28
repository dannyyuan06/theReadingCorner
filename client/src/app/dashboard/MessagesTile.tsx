import Link from 'next/link'
import { WithoutBookMessage } from '../bulletinBoard/WithoutBookMessage'
import tStyles from './tiles.module.css'
import { getMessagesType } from '@/models/BulletinBoard'

export async function MessagesTile({messages}: {messages: getMessagesType[]}) {
    return(
        <div>
            <Link href='/bulletinBoard' className={tStyles.title}><h2>RECENT MESSAGES</h2></Link>
            <div className={tStyles.container}>
                {messages.map((message) => (
                    <WithoutBookMessage key={message.messageid} message={message}/>
                ))}
            </div>
        </div>
    )
}