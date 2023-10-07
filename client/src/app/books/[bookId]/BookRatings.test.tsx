import { fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { BookRatings } from "./BookRatings";
import { BookType, bookexample } from "@/app/bookexample";
import { UserBook } from "@prisma/client";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'

const mockBook = bookexample[1]
const mockUserBook: UserBook = {
  bookid: "9283t4yog",
  dateFinished: new Date(),
  dateStarted: new Date(),
  page: 12,
  score: 2,
  status: 3,
  username: "JohnDoe"
}

const mockBookInDB = {
  bookid: "ARandomString2",
  bookPicture: "/images/book-placeholder.png",
  title: "A Random string 2",
  author: "A Random string 2",
  description: "A Random string 2",
  pageCount: 12,
  averageRating: 4.5,
}

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: () => {}
  })
}))

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: {
      username: "testuser",
      profilePicture: "https://example.com/profile-picture.jpg",
    },
  })),
}));

describe("BookRatings", () => {
  it("should render the average rating", () => {
    render(<BookRatings book={mockBook} userbook={mockUserBook} bookInDB={mockBookInDB} />);

    const averageRatingElement = screen.getByText("4.50");
    expect(averageRatingElement).toBeInTheDocument();
  });

  it("should render the user's score", () => {
    render(<BookRatings book={mockBook} userbook={mockUserBook} bookInDB={mockBookInDB} />);

    const userScoreElement = screen.getByText("2");
    expect(userScoreElement).toBeInTheDocument();
  });

  it("should render the user's status", () => {
    render(<BookRatings book={mockBook} userbook={mockUserBook} bookInDB={mockBookInDB} />);

    const userStatusElement = screen.getByText("On Hold");
    expect(userStatusElement).toBeInTheDocument();
  });

  it("should render the total pages", () => {
    render(<BookRatings book={mockBook} userbook={mockUserBook} bookInDB={mockBookInDB} />);

    const userPageElement = screen.getByText("/207");
    expect(userPageElement).toBeInTheDocument();
  });

  it("should disable the submit button if no changes have been made", () => {
    render(<BookRatings book={mockBook} userbook={mockUserBook} bookInDB={mockBookInDB} />);

    const submitButtonElement = screen.getByText("SUBMIT");

    expect(submitButtonElement).toHaveStyle("backgroundColor: var(--theme-light-light-grey)");
  });

  it("should enable the submit button if changes have been made", async () => {
    const user = userEvent.setup()
    render(<BookRatings book={mockBook} userbook={mockUserBook} bookInDB={mockBookInDB} />);
    
    const userScoreDropDownElement = screen.getAllByTestId("drop-down-button");
    await user.click(userScoreDropDownElement[0])
    
    const tenButtonElement = screen.getAllByTestId("drop-down-menu");
    await user.click(tenButtonElement[0])

    const submitButtonElement = screen.getByText("SUBMIT");
    expect(submitButtonElement).not.toHaveAttribute("style", "backgroundColor: var(--theme-light-light-grey)");
  });

  // Edge cases

  it("should render the average rating as 'No Readers' if there are no readers", () => {
    render(<BookRatings book={mockBook} userbook={null} bookInDB={mockBookInDB} />);

    const averageRatingElement = screen.getByText("No Readers");
    expect(averageRatingElement).toBeInTheDocument();
  });

  it("should render the user's score as '-' if the user has not rated the book", () => {
    render(<BookRatings book={mockBook} userbook={null} bookInDB={mockBookInDB} />);

    const userScoreElement = screen.getByText("-");
    expect(userScoreElement).toBeInTheDocument();
  });

  it("should render the user's status as 'Haven't Read' if the user has not started the book", () => {
    render(<BookRatings book={mockBook} userbook={null} bookInDB={mockBookInDB} />);

    const userStatusElement = screen.getByText("Haven't Read");
    expect(userStatusElement).toBeInTheDocument();
  });

  it("should render the user's page as '-' if the user has not started the book", () => {
    render(<BookRatings book={mockBook} userbook={null} bookInDB={mockBookInDB} />);

    const userPageElement = screen.getByText("-");
    expect(userPageElement).toBeInTheDocument();
  });
});
