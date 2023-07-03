import { PageHeader } from "@/app/components/PageHeader";
import Image from "next/image";
import { users } from "../users";
import styles from './page.module.css'

export default function Profile({ params }: {params: {userId: string}}) {

    return (
        <div>
            <PageHeader>{users[params.userId].name.toUpperCase()}'S PROFILE</PageHeader>
            <div className={styles.bodyContainer}>
                <div className={styles.bodyLeft}>
                <Image src="/images/profile_picture_placeholder.png" width={100} height={100} alt="profile picture placeholder"/>
                </div>
                <div className={styles.bodyRight}>

                </div>
            </div>
        </div>
    )
}