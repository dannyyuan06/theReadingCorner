import { render, screen } from "@testing-library/react";
import { BookSuggestions } from "./BookSuggestions";
import { AddBook } from "../components/AddBook";
import { BookAttackment } from "../components/BookAttachment";
import { Book } from "@prisma/client";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

// Mock useAuthSession to return a user object
jest.mock("../../redux/useAuthSession", () => () => ({
  username: "testuser",
}));

// Mock the AddBook component
jest.mock("../components/AddBook", () => ({
  __esModule: true,
  default: () => <div>AddBook component</div>,
}));

// Mock the BookAttackment component
jest.mock("../components/BookAttachment", () => ({
  __esModule: true,
  default: () => <div>BookAttackment component</div>,
}));

global.fetch = jest.fn()

// Mock the Book type
type BookType = {
  bookid: number;
  title: string;
  author: string;
};

// Create a mock book object
const mockBook: BookType = {
  bookid: 12345,
  title: "The Hitchhiker's Guide to the Galaxy",
  author: "Douglas Adams",
};

describe("BookSuggestions", () => {
  it("should render the correct components", () => {
    render(<BookSuggestions />);

    // Expect to see the BookSuggestion header
    const headerElement = screen.getByText("BOOK SUGGESTION");
    expect(headerElement).toBeInTheDocument();

    // Expect to see the BookAttackment component for each book in the books state
    const bookAttachmentElements = screen.queryAllByTestId("book-attachment");
    expect(bookAttachmentElements.length).toEqual(0);

    // Expect to see the AddBook component when the didAddBook state is true
    const addBookElement = screen.queryAllByTestId("add-book");
    expect(addBookElement.length).toEqual(0);

    // Expect to see the Submit button when the books state is not empty
    const submitButtonElement = screen.getByText("SUBMIT");
    expect(submitButtonElement).toBeInTheDocument();
  });

  it("should disable the Submit button when the books state is empty", () => {
    render(<BookSuggestions />);

    const submitButtonElement = screen.getByText("SUBMIT");
    expect(submitButtonElement).toHaveStyle("backgroundColor: var(--theme-light-light-grey)")
  });

  it("should not call the onSubmit function when the Submit button is clicked if no books are present", async () => {
    render(<BookSuggestions />);
    const user = userEvent.setup()
    const submitButtonElement = screen.getByText("SUBMIT");
    user.click(submitButtonElement);

    expect(fetch).toHaveBeenCalledTimes(0);
  });
});
