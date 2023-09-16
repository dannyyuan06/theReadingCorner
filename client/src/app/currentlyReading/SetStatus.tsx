"use client";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import styles from "./SetStatus.module.css";
import { DropDownButton } from "@/app/components/DropDownButton";
import { Book, CurrentlyReading } from "@prisma/client";
import { currentBookType } from "./SetStatusButton";
import { Popup } from "../components/Popup";
import { CurrentlyReadingUpdate } from "@/lib/types/fetchTypes/currentlyReading";

type pageType = "" | number;

// Dictionary of status and how they are stored in the database
export const statusObj: { [id: string]: number } = {
  "Haven't Read": 0,
  "Reading": 1,
  "Finished": 2,
  "On Hold": 3,
  "Dropped": 4,
};
// Array of the status
export const statusArray = Object.keys(statusObj);

export function SetStatus({
  currentlyReading,
  book,
  setClicked,
  setCurrent,
}: {
  currentlyReading: CurrentlyReading;
  book: Book;
  setClicked: Dispatch<SetStateAction<boolean>>;
  setCurrent: Dispatch<SetStateAction<currentBookType>>;
}) {
  const pageCount = book.pageCount;
  // Status of the book
  const [status, setStatus] = useState<string>(
    statusArray[currentlyReading.status]
  );
  // Pages read by the book
  const [page, setPage] = useState<pageType>(
    currentlyReading.pageNumber === -1 ? "" : currentlyReading.pageNumber
  );
  // Affilate link of the book
  const [affiliateLink, setAffiliateLink] = useState(
    currentlyReading.affiliateLink
  );
  // Variable which is changed if there has been a change
  const changed = useRef(false);
  // Change all states at once.
  const setStates = useCallback((status: number, page: pageType) => {
    setStatus(statusArray[status]);
    setPage(page);
    changed.current = true;
  }, []);

  // How to update the status state if changed
  const updateStatus = (status: string) => {
    if (statusArray[0] === status) setStates(0, "");
    else if (statusArray[1] === status) setStates(1, page !== "" ? page : 1);
    else if (statusArray[2] === status) setStates(2, pageCount);
    else if (statusArray[3] === status) setStatus(status);
    else if (statusArray[4] === status) setStatus(status);
    else setStates(0, "");
  };
  // How to update the page count state if changes
  const updatePageCount = (page: pageType) => {
    if (page === pageCount) setStates(2, pageCount);
    else if (page === "") setStates(0, "");
    else if (page <= pageCount) setStates(1, page);
  };
  // Validation before calling updatePageCount
  const pageHandler = (e: FormEvent<HTMLInputElement>) => {
    const number = parseInt(e.currentTarget.value);
    // If the string is not a number set page count to ""
    if (number <= pageCount) updatePageCount(number);
    else if (Number.isNaN(number)) updatePageCount("");
  };
  // Runs if the submit button is clicked
  const submitHandler = async () => {
    // create another constant to check for types in development
    const request: CurrentlyReadingUpdate = {
      pageNumber: page,
      status: statusObj[status],
      affiliateLink: affiliateLink,
    };
    if (changed.current) { // Has anything changed?
      // Fetch request
      const res = await fetch(
        `/api/currentlyReading/${currentlyReading.readid}`,
        {
          method: "PUT",
          body: JSON.stringify(request),
          headers: { "Content-Type": "application/json" },
        }
      );
      const body = await res.json();
      // Update state
      setCurrent(body.res[0]);
    }
  };

  return (
    <Popup title="EDIT STATUS" setClicked={setClicked} confirm={submitHandler}>
      <div className={styles.scores}>
        <div className={styles.score}>
          <h2 className={styles.scoreTitle}>STATUS</h2>
          <DropDownButton
            buttons={statusArray}
            state={status}
            setState={updateStatus}
          />
        </div>
        <hr />
        <div className={styles.score}>
          <h2 className={styles.scoreTitle}>PAGE</h2>
          <h1 className={styles.scoreRating}>
            <input
              type="number"
              onInput={pageHandler}
              value={page}
              className={styles.pageNumber + " " + styles.inputType}
              max={pageCount}
              min={0}
              step={1}
            />
            <span className={styles.totalPages}>/{pageCount}</span>
          </h1>
        </div>
        <hr />
        <div className={styles.score}>
          <h2 className={styles.scoreTitle}>AFFILIATE LINK</h2>
          <input
            type="text"
            value={affiliateLink}
            onChange={(e) => {
              setAffiliateLink(e.target.value);
              changed.current === true;
            }}
          />
        </div>
      </div>
    </Popup>
  );
}
