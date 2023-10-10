import { render, screen } from "@testing-library/react";
import { BookTile } from "./BookTile";
import { Book, CurrentlyReading } from "@prisma/client";
import "@testing-library/jest-dom";

interface CurrentlyReadingIncludingBook extends CurrentlyReading {
  book: Book;
}

const mockBook: Book = {
  bookid: "12345",
  title: "The Hitchhiker's Guide to the Galaxy",
  author: "Douglas Adams",
  description:
    "A humorous science fiction comedy series created by Douglas Adams.",
  bookPicture: "https://example.com/book-picture.jpg",
  pageCount: 224,
  averageRating: 2,
};

const mockCurrentlyReading: CurrentlyReadingIncludingBook = {
  readid: 123,
  bookid: "12345",
  pageNumber: 100,
  dateStarted: new Date(),
  status: 1,
  affiliateLink: "1231tqgrebsf",
  book: mockBook,
};

describe("BookTile", () => {
  it("should render the book title", () => {
    render(<BookTile book={mockCurrentlyReading} />);

    const bookTitleElement = screen.getByText(mockBook.title);
    expect(bookTitleElement).toBeInTheDocument();
  });

  it("should render the book author", () => {
    render(<BookTile book={mockCurrentlyReading} />);

    const bookAuthorElement = screen.getByText("AUTHOR: Douglas Adams");
    expect(bookAuthorElement).toBeInTheDocument();
  });

  it("should render the book page", () => {
    render(<BookTile book={mockCurrentlyReading} />);

    const bookPageElement = screen.getByText("PAGE: 100/224");
    expect(bookPageElement).toBeInTheDocument();
  });

  it("should render the book average rating", () => {
    render(<BookTile book={mockCurrentlyReading} />);

    const bookAverageRatingElement = screen.getByText("2.00");
    expect(bookAverageRatingElement).toBeInTheDocument();
  });

  it("should render the book image", () => {
    render(<BookTile book={mockCurrentlyReading} />);

    const bookImageElement = screen.getByRole("img");
    expect(bookImageElement).toBeInTheDocument();
  });
});
