'use client'
import { useSearchParams } from "next/navigation";
import { PageHeader } from "../../components/PageHeader";
import { Form } from "./Form";
import styles from './page.module.css'

export default function Register() {

    const searchParams = useSearchParams()

    
    return (
        <div className={styles.container}>
            <PageHeader>Register</PageHeader>
            <div className={styles.wrapper}>
                <Form name={searchParams.get("name")} email={searchParams.get("email")} picture={searchParams.get("picture")}/>
            </div>
        </div>
        
    )
}