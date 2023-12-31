import Image from "next/image";
import styles from "./BookTile.module.css";
import tStyles from "./tiles.module.css";
import Link from "next/link";
import { Book, CurrentlyReading } from "@prisma/client";

interface CurrentlyReadingIncludingBook extends CurrentlyReading {
  book: Book;
}

export function BookTile({ book }: { book: CurrentlyReadingIncludingBook }) {
  // If the database stores -1 as rating it means it doesn't have any ratings yet.
  const displayAverageRating =
    book.book.averageRating === -1
      ? "-"
      : book.book.averageRating.toFixed(2) ?? "";
  return (
    <div className={tStyles.container}>
      <div className={styles.container}>
        <Link
          href={`/books/${book.book.bookid}`}
          style={{ backgroundColor: "transparent" }}
        >
          <Image
            alt="book placeholder"
            style={{ objectFit: "cover" }}
            src={book.book.bookPicture}
            width={100}
            height={155}
            className={styles.image}
          />
        </Link>
        <div className={styles.textContainer}>
          <div className={styles.headerBodySeparator}>
            <div className={styles.titles}>
              <Link href={`/books/${book.book.bookid}`}>
                <h2 className={styles.bookTitle}>{book.book.title}</h2>
              </Link>
              <h3>AUTHOR: {book.book.author}</h3>
              <h3>
                START DATE:{" "}
                <span>
                  {book.dateStarted
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </span>
              </h3>
              <h3>
                PAGE: {book.pageNumber === -1 ? "" : book.pageNumber}/
                {book.book.pageCount}
              </h3>
            </div>
            <div className={styles.scoreContainer}>
              <div className={styles.scoreWrapper}>
                <h3>SCORE</h3>
                <div className={styles.displayScore}>
                  {displayAverageRating}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}