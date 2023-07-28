import Link from 'next/link'
import { WithoutBookMessage } from '../bulletinBoard/WithoutBookMessage'
import tStyles from './tiles.module.css'
import { BulletinBoard } from '@/models/BulletinBoard'

export async function MessagesTile() {
    const messages = await getMessages()
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

async function getMessages() {
    const messages = BulletinBoard.getMessages(5)
    return messages
}