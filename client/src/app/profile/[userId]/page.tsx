import { PageHeader } from "@/app/components/PageHeader";
import styles from './page.module.css'
import { Split } from "./Split";
import { ProfileMini } from "@/app/components/ProfileMini";
import { SmallBook } from "./SmallBook";
import User, { userWithFriendid } from "@/models/User";
import { getLastOnlineStatus } from "./calculateDate";
import { ProfilePic } from "./ProfilePic";
import { FriendContainer } from "./FriendContainer";
import { FriendRequestButton } from "./FriendRequestButton";
import { EditButton } from "./EditButton";
import { headers } from "next/dist/client/components/headers";
import convertMinutes from "@/lib/minsToDate";

const getUsernames = (friends:userWithFriendid[]) => {
    return friends.map((friend) => friend.username)
}

export default async function Profile({ params }: {params: {userId: string}}) {

    const [user, err] = await getUser(params.userId)
    const headersList = headers()
    const userUsername = headersList.get('username')
    
    if (!user) return (
        <div className={styles.container}>
            <PageHeader>Error Finding User</PageHeader>
        </div>
    )

    const isSelf = userUsername === user.username;
    const halfFriends = [...getUsernames(user.incomingRequestFriends), ...getUsernames(user.requestPendingFriends)]

    const totalAndNumberAndPages = user.booksRead.reduce((prev: {total: number, num: number, pages: number}, curr) => {
        return {total: prev.total + curr.score, num: prev.num + 1, pages: prev.pages + curr.book.pageCount}
    }, {total: 0, num: 0, pages: 0})

    const mean = Math.round(totalAndNumberAndPages.total / totalAndNumberAndPages.num * 100) / 100
    const time = convertMinutes(totalAndNumberAndPages.pages*1.7)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <PageHeader>
                    {user.username}&apos;S PROFILE
                </PageHeader>
                {!isSelf && <FriendRequestButton friendUsername={user.username} alreadyRequested={halfFriends.includes(userUsername ?? "")} alreadyFriends={getUsernames(user.friends).includes(userUsername ?? "")}/>}
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.bodyLeft}>
                    <ProfilePic username={params.userId} profilePic={user.profilePicture}/>
                    <section>
                        <h3 className={styles.smallHeader}>QUICK INFO</h3>
                        <Split title="LAST LOGGED ON" value={getLastOnlineStatus(user.lastOnline)}/>
                        <Split title="JOINED" value={(user.joinDate).toDateString().split(" ").slice(1).join(" ")}/>
                        <Split title="BULLETIN POSTS" value={user.numBulletinPosts.toString()}/>
                        <Split title="BOOKS READ" value={user.numBooksRead.toString()}/>
                    </section>
                    {isSelf
                    ? <FriendContainer friendContainerClass={styles.friendContainer} headerClass={styles.smallHeader} user={user}/>
                    : <section>
                        <h3 className={styles.smallHeader}>FRIENDS</h3>
                        {user.friends.map((friend, index) => (
                            <div key={index} className={styles.friendContainer}>
                                <ProfileMini key={friend.username} user={friend} dateSent={getLastOnlineStatus(friend.lastOnline)}/>
                            </div>
                        ))}
                    </section>
                    }
                </div>
                <div className={styles.bodyRight}>
                    <section className={styles.biography}>
                        <h3 className={styles.smallHeader}>SUMMARY
                        {isSelf && <EditButton user={user}/>}
                        </h3>
                        {user.description}
                    </section>
                    <section className={styles.statistics}>
                        <h3 className={styles.smallHeader}>BOOKS</h3>
                        <div className={styles.splitContainer}>
                            <span>Total Reading Time: {time}</span>
                            <span className={styles.splitRight}>Mean Score: {mean}</span>
                        </div>
                        <div className={styles.booksContainer}>
                            {user.booksRead.map((userbook) => (
                                <SmallBook key={userbook.bookid} userbook={userbook}/>
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