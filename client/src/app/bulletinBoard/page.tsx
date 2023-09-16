import { PageHeader } from "../components/PageHeader";
import styles from './page.module.css'
import { InputText } from "./InputText";
import { Messages } from "./Messages";
import { BulletinBoard } from "@/models/BulletinBoard";

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default async function bulletinBoard() {
    // use the async function below
    const messages = await getMessages()
    return (
        <div className={styles.container}>
            <PageHeader>BULLETIN BOARD</PageHeader>
            <div>
            <InputText/>
            </div>
            <div className={styles.messagesContainer}>
                <Messages messagesProp={messages}/>
            </div>
        </div>
    )
}


// Get the most recent messages from the 
async function getMessages() {
    const messages = await BulletinBoard.getMessages(10)
    return messages
}

//margin-top: 30px;