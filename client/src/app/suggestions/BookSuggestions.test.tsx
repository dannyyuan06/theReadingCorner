import { render, screen } from "@testing-library/react";
import { BookSuggestions } from "./BookSuggestions";
import { AddBook } from "../components/AddBook";
import { BookAttackment } from "../components/BookAttachment";
import { Book } from "@prisma/client";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../redux/useAuthSession", () => () => ({
  username: "testuser",
}));

jest.mock("../components/AddBook", () => ({
  __esModule: true,
  default: () => <div>AddBook component</div>,
}));

jest.mock("../components/BookAttachment", () => ({
  __esModule: true,
  default: () => <div>BookAttackment component</div>,
}));

global.fetch = jest.fn()

type BookType = {
  bookid: number;
  title: string;
  author: string;
};

const mockBook: BookType = {
  bookid: 12345,
  title: "The Hitchhiker's Guide to the Galaxy",
  author: "Douglas Adams",
};

describe("BookSuggestions", () => {
  it("should render the correct components", () => {
    render(<BookSuggestions />);

    const headerElement = screen.getByText("BOOK SUGGESTION");
    expect(headerElement).toBeInTheDocument();

    const bookAttachmentElements = screen.queryAllByTestId("book-attachment");
    expect(bookAttachmentElements.length).toEqual(0);

    const addBookElement = screen.queryAllByTestId("add-book");
    expect(addBookElement.length).toEqual(0);

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
