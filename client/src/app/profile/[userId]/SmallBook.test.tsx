import { prettyDOM, render, screen } from "@testing-library/react";
import { SmallBook } from "./SmallBook";
import { userBookWithBook } from "@/models/UserBook";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@prisma/client";
import "@testing-library/jest-dom";

const mockBook: Book = {
  bookid: "12345",
  title: "The Hitchhiker's Guide to the Galaxy",
  author: "Douglas Adams",
  description: "A humorous science fiction comedy series created by Douglas Adams.",
  bookPicture: "https://example.com/book-picture.jpg",
  pageCount: 200,
  averageRating: 2
};

const mockUserBookWithBook: userBookWithBook = {
  bookid: "123",
  username: "JohnDoe",
  status: 2,
  page: 100,
  score: 9,
  dateStarted: new Date(),
  dateFinished: new Date(),
  book: mockBook
};

describe("SmallBook", () => {
  it("should render the book title", () => {
    render(<SmallBook userbook={mockUserBookWithBook} />);

    const bookTitleElement = screen.getByText("The Hitchhiker's...");
    expect(bookTitleElement).toBeInTheDocument();
  });

  it("should render the book author", () => {
    render(<SmallBook userbook={mockUserBookWithBook} />);
    
    const bookAuthorElement = screen.getByText("AUTHOR: Douglas Adams");
    expect(bookAuthorElement).toBeInTheDocument();
  });

  it("should render the book page", () => {
    render(<SmallBook userbook={mockUserBookWithBook} />);

    const bookPageElement = screen.getByText("100");
    expect(bookPageElement).toBeInTheDocument();
  });

  it("should render the book score", () => {
    render(<SmallBook userbook={mockUserBookWithBook} />);

    const bookScoreElement = screen.getByText("9");
    expect(bookScoreElement).toBeInTheDocument();
  });

  it("should render the book image", () => {
    render(<SmallBook userbook={mockUserBookWithBook} />);

    const bookImageElement = screen.getByRole("img");
    expect(bookImageElement).toBeInTheDocument();
  });

  it("should render the book status in the progress bar", () => {
    render(<SmallBook userbook={mockUserBookWithBook} />);

    const progressBarElement = screen.getByText("FINISHED");
    expect(progressBarElement).toBeInTheDocument();
  });

  it("should render the book progress in the progress bar", () => {
    render(<SmallBook userbook={mockUserBookWithBook} />);

    const progressBarElement = screen.getByTestId("progress-line");
    expect(progressBarElement).toBeInTheDocument();
  });
});
