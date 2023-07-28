import { PageHeader } from "../components/PageHeader";
import { FutureMeeting } from "./FutureMeetings";
import { Meeting } from "./Meeting";
import styles from './page.module.css'

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default function meetings() {
    return (
        <div className={styles.container}>
            <PageHeader>MEETINGS</PageHeader>
            <Meeting/>
            <h2 className={styles.previousMeetings}>FUTURE MEETINGS</h2>
            <FutureMeeting/>
            <FutureMeeting/>
            <FutureMeeting/>
        </div>
    )
}