"use client";
import styles from "./WithoutBookMessage.module.css";
import { ProfileMini } from "../components/ProfileMini";
import { MoreButton } from "../components/MoreButton";
import { BookAttackment } from "../components/BookAttachment";
import { Book } from "@prisma/client";
import { getMessagesType } from "@/models/BulletinBoard";
import { getLastOnlineStatus } from "./getOnlineStatus";
import { useState } from "react";
import { Popup } from "../components/Popup";
import { useSession } from "next-auth/react";

export function WithoutBookMessage({ message }: { message: getMessagesType }) {
  const [copied, setCopied] = useState(false); // Display if message copied
  const [reported, setReported] = useState(false); // Display report confirmation screen
  const [deleted, setDeleted] = useState(false); // Display delete confirmation screen
  const [unreported, setUnreported] = useState(false); // Display unreported screen
  const { data }: any = useSession(); // Get authentication session data

  // Triggered if the share button is pressed
  const share = async () => {
    const shareText = `Hi, look at this post on The Reading Corner: ${window.location.href}#${message.messageid}`;
    navigator.clipboard.writeText(shareText).then(() => { // Write to clipboard
      setCopied(true);
      setTimeout(() => {
        setCopied(false); // Hide copied message
      }, 2000);
    });
  };

  // If report function is pressed
  const report = async () => {
    await fetch(`/api/bulletinBoard/${message.messageid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  };

  // Administrators un-report the message if they allow it
  const allow = async () => {
    await fetch(`/api/bulletinBoard/unreportMessage/${message.messageid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  };

  // Administrator delete message
  const deleteMessage = async () => {
    await fetch(`/api/bulletinBoard/${message.messageid}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  
  let buttons: { [id: string]: () => void } = {
    Share: share,
  };
  // If user is an administrator,
  // then add the un-report and delete
  // else add the report button to the popup menu
  if (data?.accessLevel === 3) {
    if (message.reported)
      buttons["Un-report"] = () => {
        setUnreported(true);
      };
    buttons["Delete"] = () => {
      setDeleted(true);
    };
  } else
    buttons["Report"] = () => {
      setReported(true);
    };

  return (
    <>
      <div className={styles.container} id={`${message.messageid}`}>
        {copied && <div className={styles.copied}>Copied to clipboard</div>}
        <hr />
        <div className={styles.userContainer}>
          <ProfileMini
            user={message.user}
            dateSent={getLastOnlineStatus(new Date(message.dateCreated))}
          />
          <MoreButton buttons={buttons} />
        </div>
        <p className={styles.paragraphs}>{message.body}</p>
        <div className={styles.booksContainer}>
          {message.books.map(({ book }: { book: Book }, index: number) => (
            <BookAttackment key={book.bookid} book={book} index={index} />
          ))}
        </div>
      </div>
      {reported && (
        <Popup title="CONFIRMATION" setClicked={setReported} confirm={report}>
          Are you sure you want to report this to an administrator?
        </Popup>
      )}
      {unreported && (
        <Popup title="CONFIRMATION" setClicked={setUnreported} confirm={allow}>
          Are you sure you want to allow this message?
        </Popup>
      )}
      {deleted && (
        <Popup
          title="CONFIRMATION"
          setClicked={setDeleted}
          confirm={deleteMessage}
        >
          Are you sure you want to delete this message?
        </Popup>
      )}
    </>
  );
}
