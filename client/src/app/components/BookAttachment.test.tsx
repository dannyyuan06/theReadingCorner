import { render, screen } from "@testing-library/react";
import { BookAttackment } from "./BookAttachment";
import { BookLink } from "../bulletinBoard/BookLink";
import { Book } from "@prisma/client";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'

jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}))


const mockBook: Book = {
  bookid: "12345",
  title: "The Hitchhiker's Guide to the Galaxy",
  author: "Douglas Adams",
  description: "A humorous science fiction comedy series created by Douglas Adams.",
  bookPicture: "https://example.com/book-picture.jpg",
  pageCount: 1,
  averageRating: 2
};

describe("BookAttachment", () => {
  it("should render a BookLink component", () => {
    render(<BookAttackment book={mockBook} index={0} />);

    const bookLinkElement = screen.getAllByRole("link");
    expect(bookLinkElement.length).toEqual(2)
  });

  it("should render the book author", () => {
    render(<BookAttackment book={mockBook} index={0} />);

    const authorElement = screen.getByText(mockBook.author);
    expect(authorElement).toBeInTheDocument();
  });

  it("should render the book description", () => {
    render(<BookAttackment book={mockBook} index={0} />);

    const descriptionElement = screen.getByText(mockBook.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it("should render a cancel cross button if the setBooks prop is passed", () => {
    render(<BookAttackment book={mockBook} index={0} setBooks={() => {}} />);

    const cancelCrossElement = screen.getByRole("button");
    expect(cancelCrossElement).toBeInTheDocument();
  });

  it("should not render a cancel cross button if the setBooks prop is not passed", () => {
    render(<BookAttackment book={mockBook} index={0} />);

    const cancelCrossElement = screen.queryByRole("button");
    expect(cancelCrossElement).toBeNull();
  });

  it("should call the setBooks function when the cancel cross button is clicked", async () => {
    const user = userEvent.setup()
    const setBooksMock = jest.fn();

    render(<BookAttackment book={mockBook} index={0} setBooks={setBooksMock} />);

    const cancelCrossElement = screen.getByRole("button");
    await user.click(cancelCrossElement);

    expect(setBooksMock).toHaveBeenCalledTimes(1);
  });
});
