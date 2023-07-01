import { PageHeader } from "../components/PageHeader";
import { WithoutBookMessage } from "./WithoutBookMessage";
import styles from './page.module.css'
import { InputText } from "./InputText";


export default function bulletinBoard() {

    return (
        <div className={styles.container}>
            <PageHeader>BULLETIN BOARD</PageHeader>
            <div>
            <InputText/>
            </div>
            <div className={styles.messagesContainer}>
                <WithoutBookMessage/>
                <WithoutBookMessage/>
                <WithoutBookMessage/>
                <WithoutBookMessage/>
            </div>
        </div>
    )
}

//margin-top: 30px;