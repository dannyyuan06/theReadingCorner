import { PageHeader } from "../components/PageHeader";
import { WithoutBookMessage } from "./WithoutBookMessage";
import styles from './page.module.css'
import { InputText } from "./InputText";
import { Messages } from "./Messages";
import { BulletinBoard } from "@/models/BulletinBoard";

export default async function bulletinBoard() {
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

async function getMessages() {
    const messages = await BulletinBoard.getMessages()
    return messages
}

//margin-top: 30px;