import { render, screen } from "@testing-library/react";
import { BookStandard } from "./BookStandard";
import "@testing-library/jest-dom";
const mockBook = {
  bookId: "12345",
  bookTitle: "The Hitchhiker's Guide to the Galaxy",
  authors: "Douglas Adams",
  datePublished: "1979-10-12",
  genre: "Science Fiction",
  image: "/images/book-placeholder.png"
};

describe("BookStandard", () => {
  it("should render the book title", () => {
    render(<BookStandard {...mockBook} />);

    const bookTitleElement = screen.getByText("The Hitchhiker's Guide to the Galaxy");
    expect(bookTitleElement).toBeInTheDocument();
  });

  it("should render the book authors", () => {
    render(<BookStandard {...mockBook} />);

    const bookAuthorsElement = screen.getByText("Douglas Adams");
    expect(bookAuthorsElement).toBeInTheDocument();
  });

  it("should render the book date published", () => {
    render(<BookStandard {...mockBook} />);

    const bookDatePublishedElement = screen.getByText("1979-10-12");
    expect(bookDatePublishedElement).toBeInTheDocument();
  });

  it("should render the book genre", () => {
    render(<BookStandard {...mockBook} />);

    const bookGenreElement = screen.getByText("Science Fiction");
    expect(bookGenreElement).toBeInTheDocument();
  });

  it("should render the book image", () => {
    render(<BookStandard {...mockBook} />);

    const bookImageElement = screen.getByRole("img");
    expect(bookImageElement).toBeInTheDocument();
  });

});
