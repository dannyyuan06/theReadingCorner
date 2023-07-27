import Image from "next/image";
import styles from './ProfileStandard.module.css'
import { TitleSplit } from "./TitleSplit";
import { MoreButton } from "../components/MoreButton";
import { user } from "./users";
import { Users } from "@prisma/client";

export function ProfileStandard(user: Users) {

    return (
        <>
            <hr/>
            <div className={styles.container}>
                <Image alt='profile picture placeholder' src={user.profilePicture} width={40} height={40}/>
                <TitleSplit tAlign="left" value={user.username} flex={1}/>
                <TitleSplit tAlign="left" value={`${user.firstName} ${user.lastName}`} flex={1}/>
                <TitleSplit tAlign="left" value={(new Date(user.joinDate).toLocaleDateString("en-GB"))} flex={1}/>
                <TitleSplit tAlign="left"value={(new Date(user.lastOnline).toLocaleDateString("en-GB"))} flex={1}/>
                <TitleSplit tAlign="left" value={user.email} flex={2}/>
                <TitleSplit tAlign="right" value={`${user.numBooksRead}`} flex={1}/>
                <MoreButton buttons={["Reset password", "Disable account", "Delete account"]}/>
            </div>
        </>
        
    )
}