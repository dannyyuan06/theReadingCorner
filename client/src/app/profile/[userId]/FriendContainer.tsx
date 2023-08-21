'use client'
import { ProfileMini } from "@/app/components/ProfileMini";
import { getProfileInfoReturnType, userWithFriendid } from "@/models/User";
import { IncomingFriend } from "./IncomingFriend";
import { SearchFriends } from "./SearchFriends";
import { getLastOnlineStatus } from "./calculateDate";
import { useState } from "react";

const getNames = (friends:userWithFriendid[]) => {
    return friends.map((friend) => friend.username)
}


export function FriendContainer({user, headerClass, friendContainerClass}: {user: getProfileInfoReturnType, headerClass: string, friendContainerClass: string}) {

    const [friends, setFriends] = useState<userWithFriendid[]>(user.friends);
    const [incomingFriends, setIncomingFriends] = useState<userWithFriendid[]>(user.incomingRequestFriends);
    const [requestPendingFriends, setRequestPendingFriends] = useState<userWithFriendid[]>(user.requestPendingFriends);

    const allFriends = [...getNames(friends), ...getNames(incomingFriends), ...getNames(requestPendingFriends)]

    return (
        <>
        { friends.length !== 0
        && <section>
            <h3 className={headerClass}>FRIENDS</h3>
            {friends.map((friend, index) => (
                <div key={index} className={friendContainerClass}>
                    <ProfileMini key={friend.username} user={friend} dateSent={getLastOnlineStatus(friend.lastOnline)}/>
                </div>
            ))}
        </section>}
        { incomingFriends.length !== 0
        && <section>
            <h3 className={headerClass}>INCOMING FRIEND REQUESTS</h3>
            {user.incomingRequestFriends.map((friend) => (
                <IncomingFriend key={friend.username} friend={friend} username={user.username} friendid={[friend.username, user.username]} setIncomingFriends={setIncomingFriends} setFriends={setFriends}/>
            ))}
        </section>
        }
        { requestPendingFriends.length !== 0
        && <section>
            <h3 className={headerClass}>OUTGOING FRIEND REQUESTS</h3>
            {user.requestPendingFriends.map((friend) => (
                <ProfileMini key={friend.username} user={friend} dateSent={getLastOnlineStatus(new Date(friend.lastOnline))}/>
            ))}
        </section>
        }
        <section>
            <h3 className={headerClass}>FIND USERS</h3>
            <SearchFriends username={user.username} setRequestPendingFriends={setRequestPendingFriends} allFriends={allFriends}/>
        </section>
        </>
    )
}