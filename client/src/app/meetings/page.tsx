import { Meetings } from "@/models/Meetings";
import { PageHeader } from "../components/PageHeader";
import { AddMeeting } from "./AddMeeting";
import { FutureMeeting } from "./FutureMeetings";
import { Meeting } from "./Meeting";
import styles from './page.module.css'
import { headers } from "next/dist/client/components/headers";

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default async function meetings() {
    
    const meetings = await getMeetings()
    const headersList = headers()
    const userAccessLevel = parseInt(headersList.get('accessLevel')?.toString() ?? "")

    if (meetings.length === 0){
        return (
            <div className={styles.container}>
            <div className={styles.pageContainer}>
                <PageHeader>MEETINGS</PageHeader>
                {userAccessLevel === 3 && <AddMeeting/>}
            </div>
            <div>
                No Upcoming Meetings
            </div>
        </div>
        )
    }

    const [firstMeeting, ...restOfMeetings] = meetings

    return (
        <div className={styles.container}>
            <div className={styles.pageContainer}>
                <PageHeader>MEETINGS</PageHeader>
                {userAccessLevel === 3 && <AddMeeting/>}
            </div>
            <Meeting {...firstMeeting}/>
            <h2 className={styles.previousMeetings}>FUTURE MEETINGS</h2>
            {restOfMeetings.map(meeting => (
                <FutureMeeting key={meeting.meetingid} {...meeting}/>
            ))}
        </div>
    )
}

async function getMeetings() {
    return Meetings.getMeetings()
}