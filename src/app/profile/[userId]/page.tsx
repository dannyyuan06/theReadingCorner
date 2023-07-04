import { PageHeader } from "@/app/components/PageHeader";
import Image from "next/image";
import { users } from "../users";
import styles from './page.module.css'
import { Split } from "./Split";
import { ProfileMini } from "@/app/components/ProfileMini";
import { friends } from "./friends";
import { readBooks } from "./books";
import { SmallBook } from "./SmallBook";

export default function Profile({ params }: {params: {userId: string}}) {

    const user = users[params.userId]

    return (
        <div className={styles.container}>
            <PageHeader>{user.name.toUpperCase()}'S PROFILE</PageHeader>
            <div className={styles.bodyContainer}>
                <div className={styles.bodyLeft}>
                    <div className={styles.profilePic}>
                        <Image src="/images/profile_picture_placeholder.png" width={100} height={100} alt="profile picture placeholder"/>
                    </div>
                    <section>
                        <h3 className={styles.smallHeader}>QUICK INFO</h3>
                        <Split title="LAST ONLINE" value="3 hours ago"/>
                        <Split title="JOINED" value={(new Date).toDateString().split(" ").slice(1).join(" ")}/>
                        <Split title="BULLETIN POSTS" value="5"/>
                        <Split title="REVIEWS" value="5"/>
                        <Split title="BOOKS READ" value="5"/>
                    </section>
                    <section>
                        <h3 className={styles.smallHeader}>FRIENDS</h3>
                        {friends.map(() => (
                            <div className={styles.friendContainer}>
                                <ProfileMini/>
                            </div>
                        ))}
                    </section>
                </div>
                <div className={styles.bodyRight}>
                    <section className={styles.biography}>
                        <h3 className={styles.smallHeader}>SUMMARY</h3>
                        {user.summary}
                    </section>
                    <section className={styles.statistics}>
                        <h3 className={styles.smallHeader}>BOOKS</h3>
                        <div className={styles.splitContainer}>
                            <span>Days: 0.2</span>
                            <span className={styles.splitRight}>Mean Score: 5.5</span>
                        </div>
                        <div>
                            {readBooks.map(() => (
                                <div>
                                    <SmallBook/>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}