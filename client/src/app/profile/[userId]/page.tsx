import { PageHeader } from "@/app/components/PageHeader";
import Image from "next/image";
import styles from './page.module.css'
import { Split } from "./Split";
import { ProfileMini } from "@/app/components/ProfileMini";
import { friends } from "./friends";
import { SmallBook } from "./SmallBook";
import User from "@/models/User";
import { getLastOnlineStatus } from "./calculateDate";
import { ProfilePic } from "./ProfilePic";

export default async function Profile({ params }: {params: {userId: string}}) {

    const [user, err] = await getUser(params.userId)
    
    if (!user) return (
        <div className={styles.container}>
            <PageHeader>Error Finding User</PageHeader>
        </div>
    )

    return (
        <div className={styles.container}>
            <PageHeader>{user.username}&apos;S PROFILE</PageHeader>
            <div className={styles.bodyContainer}>
                <div className={styles.bodyLeft}>
                    <ProfilePic username={params.userId} profilePic={user.profilePicture}/>
                    <section>
                        <h3 className={styles.smallHeader}>QUICK INFO</h3>
                        <Split title="LAST ONLINE" value={getLastOnlineStatus(user.lastOnline)}/>
                        <Split title="JOINED" value={(user.joinDate).toDateString().split(" ").slice(1).join(" ")}/>
                        <Split title="BULLETIN POSTS" value={user.numBulletinPosts.toString()}/>
                        <Split title="REVIEWS" value={user.numReview.toString()}/>
                        <Split title="BOOKS READ" value={user.numBooksRead.toString()}/>
                    </section>
                    <section>
                        <h3 className={styles.smallHeader}>FRIENDS</h3>
                        {user.friends.map((friend, index) => (
                            <div key={index} className={styles.friendContainer}>
                                <ProfileMini name={friend.username} lastOnline={getLastOnlineStatus(friend.lastOnline)} picture={friend.profilePicture}/>
                            </div>
                        ))}
                    </section>
                </div>
                <div className={styles.bodyRight}>
                    <section className={styles.biography}>
                        <h3 className={styles.smallHeader}>SUMMARY</h3>
                        {user.description}
                    </section>
                    <section className={styles.statistics}>
                        <h3 className={styles.smallHeader}>BOOKS</h3>
                        <div className={styles.splitContainer}>
                            <span>Days: {user.daysRead}</span>
                            <span className={styles.splitRight}>Mean Score: {user.meanScore}</span>
                        </div>
                        <div>
                            {user.booksRead.map((userbook) => (
                                <div key={userbook.bookid}>
                                    <SmallBook userbook={userbook}/>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}


async function getUser(username: string) {
    const user = await User.getProfileInfo(username)
    return user
  }