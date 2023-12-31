"use client";
import { useState } from "react";
import styles from "./Suggestions.module.css";
import { AddBook } from "../components/AddBook";
import { BookAttackment } from "../components/BookAttachment";
import { Book } from "@prisma/client";
import { BookSuggestionType } from "@/lib/types/fetchTypes/bookSuggestion";
import useAuthSession from "@/redux/useAuthSession";

export function BookSuggestions() {
  const [didAddBook, setDidAddBook] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const user = useAuthSession();
  // Submit handler
  const onSubmit = async () => {
    // For typescript
    const req: BookSuggestionType[] = books.map((book) => ({
      bookid: book.bookid,
      username: user?.username ?? "",
    }));

    // Fetch to own API first for future changes
    const res = await fetch("/api/bookSuggestions", {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
    });
    const body = await res.json();
    setBooks([]);
  };

  return (
    <div className={styles.container}>
      <h2>BOOK SUGGESTION</h2>
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
      <button className={styles.addButton} onClick={() => setDidAddBook(true)}>
        ADD BOOK
      </button>
      <button
        className={styles.submitButton}
        onClick={onSubmit}
        style={
          books.length === 0
            ? {
                backgroundColor: "var(--theme-light-light-grey)",
                color: "black",
              }
            : {}
        }
      >
        SUBMIT
      </button>
      {didAddBook && (
        <AddBook setDidAddBook={setDidAddBook} setBooks={setBooks} />
      )}
    </div>
  );
}
