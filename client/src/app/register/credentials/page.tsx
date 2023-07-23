import { PageHeader } from "../../components/PageHeader";
import { Form } from "./Form";
import styles from './page.module.css'

export default function register() {
    return (
        <div className={styles.container}>
            <PageHeader>Register</PageHeader>
            <div className={styles.wrapper}>
                <Form/>
            </div>
        </div>
        
    )
}