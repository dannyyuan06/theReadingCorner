import Image from "next/image";
import { PageHeader } from "../components/PageHeader";
import { ProfileStandard } from "./ProfileStandard";
import styles from './page.module.css'
import { membersUsers, user } from "./users";
import User from "@/models/User";
import { Users } from "@prisma/client";

export const fetchCache = 'force-no-store';

export default async function members() {
    const users = await getMembers()
    return(
        <div>
            <PageHeader>MEMBERS</PageHeader>
            <div className={styles.searchBar}>
                <Image alt="Search Button" src="/images/search_icon.svg" width={30} height={30}/>
                <input className={styles.searchInput} type="search" results={2} placeholder="Search by username"/>
            </div>
            <div className={styles.profilesContainer}>
                <div className={styles.titles}>
                    <span style={{width: 40}}></span>
                    <h3 style={{flex: 1}}>USERNAME</h3>
                    <h3 style={{flex: 1}}>NAME</h3>
                    <h3 style={{flex: 1}}>DATE JOINED</h3>
                    <h3 style={{flex: 1}}>LAST ONLINE</h3>
                    <h3 style={{flex: 2}}>EMAIL</h3>
                    <h3 style={{flex: 1, textAlign: 'right'}}>BOOKS READ</h3>
                    <span style={{width: 35}}></span>
                </div>
                {users.map((values: Users) => (
                    <ProfileStandard key={values.username} {... values}/>
                ))}
            </div>
        </div>
    )
}

async function getMembers() {
    const [users, err] = await User.getUsers()
    return users ?? []
}