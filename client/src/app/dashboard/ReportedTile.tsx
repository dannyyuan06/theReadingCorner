import Link from 'next/link'
import { WithoutBookMessage } from '../bulletinBoard/WithoutBookMessage'
import tStyles from './tiles.module.css'
import { BulletinBoard } from '@/models/BulletinBoard'

export async function ReportMessagesTile() {
    const [messages, err] = await getMessages()

    if (err || !messages) return <></>
    if (messages.length === 0) return <></>

    return(
        <div>
            <h2 style={{color: 'red'}}>REPORTED MESSAGES</h2>
            <div className={tStyles.container}>
                {messages.map((message) => (
                    <WithoutBookMessage key={message.messageid} message={message}/>
                ))}
            </div>
        </div>
    )
}

async function getMessages() {
    const messages = BulletinBoard.getReportedMessages()
    return messages
}