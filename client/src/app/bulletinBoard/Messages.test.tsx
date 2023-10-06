import { Messages } from "./Messages";
import { getMessagesType, booksRelationshipType } from "@/models/BulletinBoard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProfileFriendType } from "@/models/User";
import Pusher from "pusher";
jest.mock("pusher-js", () => (
  jest.fn().mockImplementation(() => ({
    subscribe: jest.fn(() => ({
      bind: jest.fn(),
    })),
    unsubscribe: jest.fn(),
  }))
)) as any;

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { accessLevel: 3 },
  })),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}))

const mockBooks: booksRelationshipType[] = [
  {
    messageid: 1,
    bookid: "1",
    bulletinboardbookid: 1,
    book: {
      bookid: "ARandomString",
      bookPicture: "/images/book-placeholder.png",
      title: "A Random string",
      author: "A Random string",
      description: "A Random string",
      pageCount: 1234,
      averageRating: 4,
    }
  },
  {
    messageid: 2,
    bookid: "2",
    bulletinboardbookid: 2,
    book: {
      bookid: "ARandomString2",
      bookPicture: "/images/book-placeholder.png",
      title: "A Random string 2",
      author: "A Random string 2",
      description: "A Random string 2",
      pageCount: 1234,
      averageRating: 4,
    }
  }
]

const mockUser:ProfileFriendType = {
  accessLevel: 1,
  firstName: "John",
  lastName: "Doe",
  lastOnline: new Date(),
  joinDate: new Date(),
  profilePicture: "/images/profile-picture-placeholder.png",
  username: "JohnDoe"
}

const mockMessages: getMessagesType[] = [
  {
    messageid: 1,
    body: "This is my first message.",
    dateCreated: new Date(),
    username: "JohnDoe",
    user: mockUser,
    books: mockBooks,
    reported: false
  },
  {
    messageid: 2,
    body: "This is my second message.",
    dateCreated: new Date(),
    username: "JulianDoe",
    user: mockUser,
    books: mockBooks,
    reported: false
  },
];

describe("Messages", () => {
  it("should render the messages", () => {
    render(<Messages messagesProp={mockMessages} />);

    const messageElements = screen.getAllByTestId("without-book-message");
    expect(messageElements.length).toBe(2);

    expect(messageElements[0]).toHaveTextContent("This is my first message.");
    expect(messageElements[1]).toHaveTextContent("This is my second message.");
  });
});
