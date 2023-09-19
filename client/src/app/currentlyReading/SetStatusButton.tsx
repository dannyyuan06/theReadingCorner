"use client";
import { useSession } from "next-auth/react";
import styles from "./SetStatusButton.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { SetStatus } from "./SetStatus";
import { Book, CurrentlyReading } from "@prisma/client";

export type currentBookType = {
  readid: number;
  bookid: string;
  dateStarted: Date;
  pageNumber: number;
  status: number;
  affiliateLink: string;
};

export function SetStatusButton(props: {
  currentlyReading: CurrentlyReading;
  book: Book;
  setCurrent: Dispatch<SetStateAction<currentBookType>>;
}) {
  // User authenticated session data
  const { data }: any = useSession();
  // Is popup clicked
  const [clicked, setClicked] = useState(false);

  return (
    data &&
    data.accessLevel === 3 && (
      <>
        <button id={styles.container} onClick={() => setClicked(true)}>
          <span className={styles.textContainer}>EDIT STATUS</span>
        </button>
        {clicked && (
          <SetStatus
            {...props}
            setClicked={setClicked}
            setCurrent={props.setCurrent}
          />
        )}
      </>
    )
  );
}
