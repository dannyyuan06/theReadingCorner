"use client";
import { useState } from "react";
import styles from "./AddToCurrentlyReading.module.css";
import { useSession } from "next-auth/react";
import { BookType } from "@/app/bookexample";
import { Popup } from "@/app/components/Popup";
import { CurrentlyReadingType } from "@/lib/types/fetchTypes/currentlyReading";

export function AddToCurrentlyReading({ book }: { book: BookType }) {
  const [pressed, setPressed] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState("");
  const { data }: any = useSession();

  const submitHandler = async () => {
    const req: CurrentlyReadingType = {
      ...book,
      affiliateLink,
    };
    await fetch("/api/currentlyReading", {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    data &&
    data.accessLevel === 3 && (
      <>
        <button className={styles.container} onClick={() => setPressed(true)}>
          SET AS CURRENTLY READING
        </button>
        {pressed && (
          <Popup setClicked={setPressed} confirm={submitHandler}>
            <div className={styles.confirmationWrapper}>
              <h2>
                Are you sure you want to set this book as the new Currently
                Reading Book?
              </h2>
              <input
                type="text"
                name="affiliate link"
                value={affiliateLink}
                placeholder="Affiliate link"
                onChange={(e) => setAffiliateLink(e.target.value)}
              />
            </div>
          </Popup>
        )}
      </>
    )
  );
}
