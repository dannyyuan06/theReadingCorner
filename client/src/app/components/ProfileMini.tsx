import Image from "next/image";
import styles from "./ProfileMini.module.css"
import { ProfileDropDown } from "./ProfileDropDown";
import Link from "next/link";
import { ProfileFriendType } from "@/models/User";

let timeout:ReturnType<typeof setTimeout>

export function ProfileMini(props: {user: ProfileFriendType, dateSent: string}) {
    const {username, profilePicture} = props.user

    return (
        <Link id={styles.container} href={`/profile/${username}`}>
            <Image style={{borderRadius: '50%'}} alt='profile picture placeholder' src={profilePicture} width={40} height={40}/>
            <div className={styles.userMeta}>
                <div className={styles.userName}>{username}</div>
                <div className={styles.userTimestamp}>{props.dateSent}</div>
            </div>
            <div className={styles.tooltip}>
                <ProfileDropDown user={props.user}/>
            </div>
        </Link>
    )
}