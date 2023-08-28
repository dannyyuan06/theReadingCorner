import Link from 'next/link'
import { WithoutBookMessage } from '../bulletinBoard/WithoutBookMessage'
import tStyles from './tiles.module.css'
import { BulletinBoard, getMessagesType } from '@/models/BulletinBoard'

export async function ReportMessagesTile({reportedMessages}: {reportedMessages: getMessagesType[]}) {
    if (reportedMessages.length === 0) return <></>

    return(
        <div>
            <h2 style={{color: 'red'}}>REPORTED MESSAGES</h2>
            <div className={tStyles.container}>
                {reportedMessages.map((message) => (
                    <WithoutBookMessage key={message.messageid} message={message}/>
                ))}
            </div>
        </div>
    )
}