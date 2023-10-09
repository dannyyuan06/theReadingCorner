import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { WithoutBookMessage } from "./WithoutBookMessage";
import { booksRelationshipType, getMessagesType } from "@/models/BulletinBoard";
import { ProfileFriendType } from "@/models/User";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import userEvent from "@testing-library/user-event";

// Mock the next-auth/react module for authentication testing
jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({ data: { accessLevel: 3 } }), // Mock authentication data for an administrator
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const mockBooks: booksRelationshipType[] = [
  {
    messageid: 1,
    bookid: "1",
    bulletinboardbookid: 1,
    book: {
      bookid: "ARandomString",
      bookPicture: "/images/book-placeholder.png",
      title: "A Random string",
      author: "A Random author",
      description: "A Random description",
      pageCount: 1234,
      averageRating: 4,
    },
  },
  {
    messageid: 2,
    bookid: "2",
    bulletinboardbookid: 2,
    book: {
      bookid: "ARandomString2",
      bookPicture: "/images/book-placeholder.png",
      title: "A Random string 2",
      author: "A Random author 2",
      description: "A Random description 2",
      pageCount: 1234,
      averageRating: 4,
    },
  },
];

const mockUser: ProfileFriendType = {
  accessLevel: 1,
  firstName: "John",
  lastName: "Doe",
  lastOnline: new Date(),
  joinDate: new Date(),
  profilePicture: "/images/profile-picture-placeholder.png",
  username: "JohnDoe",
};

const mockMessage: getMessagesType = {
  messageid: 1,
  body: "This is my first message.",
  dateCreated: new Date(),
  username: "JulianDoe",
  user: mockUser,
  books: mockBooks,
  reported: false,
};

describe("WithoutBookMessage", () => {
  it("renders message details and buttons correctly", () => {
    render(<WithoutBookMessage message={mockMessage} />);

    expect(screen.getByTestId("without-book-message")).toBeInTheDocument();
    expect(screen.getByText("This is my first message.")).toBeInTheDocument();

    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    expect(screen.getByText("A Random string")).toBeInTheDocument();
  });
  it("should not render a Delete or Un-report button for a user with an access level of less than 3", async () => {
    (useSession as any).mockReturnValueOnce({ data: { accessLevel: 1 } })
    const user = userEvent.setup();

    render(<WithoutBookMessage message={mockMessage} />);

    const moreButtonElement = screen.getByTestId("more-button");
    await user.click(moreButtonElement);

    const deleteButton = screen.queryByText("Delete");
    expect(deleteButton).not.toBeInTheDocument();

    const unReportButton = screen.queryByText("Un-report");
    expect(unReportButton).not.toBeInTheDocument();
  });
  it("should render a Delete button for a user with an access level of equal to 3", async () => {
    const user = userEvent.setup();

    render(<WithoutBookMessage message={mockMessage} />);

    const moreButtonElement = screen.getByTestId("more-button");
    await user.click(moreButtonElement);

    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });
  it("should render a Un-report button for a user with an access level of equal to 3 if message is reported", async () => {
    const user = userEvent.setup();

    render(<WithoutBookMessage message={{...mockMessage, reported: true}} />);

    const moreButtonElement = screen.getByTestId("more-button");
    await user.click(moreButtonElement);

    const deleteButton = screen.getByText("Un-report");
    expect(deleteButton).toBeInTheDocument();
  });
});
