"use client";
import { ClipboardEvent, useEffect, useRef, useState } from "react";
import styles from "./InputText.module.css";
import Image from "next/image";
import { AddBook } from "../components/AddBook";
import { BookAttackment } from "../components/BookAttachment";
import { useSession } from "next-auth/react";
import { Book } from "@prisma/client";
import { AddMessageType } from "@/lib/types/fetchTypes/addMessage";
import { GetSessionDataType } from "@/lib/types/fetchTypes/getSessionData";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { changeBulletin } from "@/redux/features/bulletinSlice";

// How many characters can be sent in a message
const textCap = 1000;

export function InputText() {
  const [textContent, setTextContent] = useState(""); // New message text content
  const [didAddBook, setDidAddBook] = useState(false); // Show add book popup
  const [books, setBooks] = useState<Book[]>([]); // Add book attachment state
  const inputRef = useRef<HTMLInputElement>(null);
  const { data }: any = useSession(); // Authentication data
  const user: GetSessionDataType = data; // Typescript
  const lookedAtBulletin = useAppSelector((state) => state.bulletinReducer);
  const dispatch = useDispatch<AppDispatch>();
  
  // Logic to save if user has looked at bulletin in the database.
  useEffect(() => {
    dispatch(changeBulletin(data?.lookedAtBulletin ?? false));
  }, [data, dispatch]);

  // Pasting plaintext without formatted string
  const pasteHandler = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    if (text.length + textContent.length < textCap) {
      const range = document.getSelection()!.getRangeAt(0);
      range.deleteContents();

      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      range.selectNodeContents(textNode);
      range.collapse(false);

      const selection = window.getSelection();
      selection!.removeAllRanges();
      selection!.addRange(range);
      setTextContent(e.currentTarget.textContent || "");
    }
  };

  // Send click is triggered
  const clickHandler = async () => {
    const message = {
      body: textContent,
      username: data?.username,
      books: books.map((book) => ({ book })),
    };
    const req: AddMessageType = {
      message: message,
      user: data!,
      dateCreated: new Date(),
    };
    await fetch("/api/bulletinBoard", {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
    });
    setTextContent(""); // Set to initial states
    setDidAddBook(false);
    setBooks([]);
    // If user hasn't posted change the database for ther user
    // This is for the statistics
    if (!data.lookedAtBulletin && !lookedAtBulletin) {
      await fetch(`/api/statisitics/${data.username}`, {
        method: "PATCH",
        body: JSON.stringify(req),
        headers: { "Content-Type": "application/json" },
      });
      dispatch(changeBulletin(true));
    }
    inputRef.current!.textContent = "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.textWithProfile}>
        <Image
          alt="profile picture placeholder"
          src={user?.profilePicture}
          style={{ borderRadius: "50%" }}
          width={50}
          height={50}
        />
        <div className={styles.textInputContainer}>
          <div
            contentEditable
            className={styles.newMessageInput}
            style={textContent.length > textCap ? { color: "red" } : {}}
            onInput={(e) =>
              setTextContent(
                e.currentTarget.textContent ? e.currentTarget.textContent : ""
              )
            }
            onPaste={pasteHandler}
            ref={inputRef}
          ></div>
          {textContent === "" && (
            <div className={styles.placeholder + " " + styles.newMessageInput}>
              What&apos;s new?
            </div>
          )}
          <div className={styles.extraInfoContainer}>
            <div className={styles.wordCount}>
              <span
                style={textContent.length > textCap ? { color: "red" } : {}}
              >
                {textContent.length}
              </span>
              /{textCap}
            </div>
            <div className={styles.booksContainer}>
              {books.map((book: Book, index: number) => (
                <BookAttackment
                  key={book.bookid}
                  book={book}
                  index={index}
                  setBooks={setBooks}
                />
              ))}
            </div>
            <div className={styles.sendToolbar}>
              <button
                className={styles.toolbarButton}
                onClick={() => setDidAddBook(true)}
              >
                <Image
                  width={30}
                  height={30}
                  alt="book attachment icon"
                  src="/images/book_icon.svg"
                />
              </button>
              <button
                onClick={clickHandler}
                className={
                  styles.toolbarSendButton +
                  (textContent === "" || textContent.length > textCap
                    ? " " + styles.toolbarButtonCant
                    : "")
                }
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
      {didAddBook && (
        <AddBook setDidAddBook={setDidAddBook} setBooks={setBooks} />
      )}
    </div>
  );
}
