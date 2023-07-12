import Image from "next/image";
import styles from './ProfileStandard.module.css'
import { TitleSplit } from "./TitleSplit";
import { MoreButton } from "../components/MoreButton";
import { user } from "./users";

export function ProfileStandard({username, name, dateJoined, lastOnline, email, booksRead}: user) {

    return (
        <>
            <hr/>
            <div className={styles.container}>
                <Image alt='profile picture placeholder' src="/images/profile_picture_placeholder.png" width={40} height={40}/>
                <TitleSplit tAlign="left" value={username} flex={1}/>
                <TitleSplit tAlign="left" value={name} flex={1}/>
                <TitleSplit tAlign="left" value={dateJoined} flex={1}/>
                <TitleSplit tAlign="left"value={lastOnline} flex={1}/>
                <TitleSplit tAlign="left" value={email} flex={2}/>
                <TitleSplit tAlign="right" value={`${booksRead}`} flex={1}/>
                <MoreButton buttons={["Reset password", "Disable account", "Delete account"]}/>
            </div>
        </>
        
    )
}