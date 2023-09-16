import { Meetings } from "@/models/Meetings";
import { PageHeader } from "../components/PageHeader";
import { AddMeeting } from "./AddMeeting";
import { FutureMeeting } from "./FutureMeetings";
import { Meeting } from "./Meeting";
import styles from "./page.module.css";
import { headers } from "next/dist/client/components/headers";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default async function meetings() {
  const meetings = await getMeetings();
  // The user's access level will be in the request headers.
  const headersList = headers();
  const userAccessLevel = parseInt(
    headersList.get("accessLevel")?.toString() ?? ""
  );
  // What JSX to return if there are no meetings
  if (meetings.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.pageContainer}>
          <PageHeader>MEETINGS</PageHeader>
          {userAccessLevel === 3 && <AddMeeting />}
        </div>
        <div>No Upcoming Meetings</div>
      </div>
    );
  }
  // Split the main upcoming meeting with future meetings.
  const [firstMeeting, ...restOfMeetings] = meetings;

  return (
    <div className={styles.container}>
      <div className={styles.pageContainer}>
        <PageHeader>MEETINGS</PageHeader>
        {userAccessLevel === 3 && <AddMeeting />}
      </div>
      <Meeting {...firstMeeting} />
      <h2 className={styles.previousMeetings}>FUTURE MEETINGS</h2>
      {restOfMeetings.map((meeting) => (
        <FutureMeeting key={meeting.meetingid} {...meeting} />
      ))}
    </div>
  );
}

// Fetch the meetings from the database.
async function getMeetings() {

  return Meetings.getMeetings();
}
