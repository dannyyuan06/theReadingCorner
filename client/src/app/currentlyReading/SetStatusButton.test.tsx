import { SetStatusButton } from "./SetStatusButton";
import { Book, CurrentlyReading } from "@prisma/client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { 
      username: "johndoe",
      firstname: "John",
      lastnae: "Doe",
      accessLevel: 3
    },
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}))

const useSessionMock = useSession as any

const mockCurrentlyReading: CurrentlyReading = {
  readid: 1,
  bookid: "1",
  affiliateLink: "https://www.amazon.com/The-Hitchhikers-Guide-to-the-Galaxy-Douglas-Adams/dp/0330258648",
  dateStarted: new Date("2023-09-29"),
  pageNumber: 100,
  status: 1,
};

const mockBook: Book = {
  bookid: "1",
  bookPicture: "https://example.com/book-cover.jpg",
  title: "The Hitchhiker's Guide to the Galaxy",
  author: "Douglas Adams",
  description: "A humorous science fiction comedy series created by Douglas Adams. Originally a radio comedy broadcast on BBC Radio 4 in 1978, it was later adapted to other formats, including stage shows, novels, comic books, a 1981 TV series, a 1984 computer game, and 2005 feature film.",
  pageCount: 200,
  averageRating: 4.5,
}

describe("SetStatusButton", () => {
  it("should render a button with the text 'EDIT STATUS' if the user is authenticated and has access level 3", () => {
    render(<SetStatusButton currentlyReading={mockCurrentlyReading} book={mockBook} setCurrent={jest.fn()} />);

    const button = screen.getByText("EDIT STATUS");
    expect(button).toBeInTheDocument();
  });

  it("should render a SetStatus component when the button is clicked", () => {
    render(<SetStatusButton currentlyReading={mockCurrentlyReading} book={mockBook} setCurrent={jest.fn()} />);

    const button = screen.getByText("EDIT STATUS");
    fireEvent(button, new MouseEvent("click"))

    waitFor(() => {
      const setStatus = screen.getByTestId("popup");
      expect(setStatus).toBeInTheDocument();
    })
  });

  it("should not render a button if the user is not authenticated or has access level less than 3", () => {
    useSessionMock.mockResolvedValueOnce({
      data: { 
        username: "johndoe",
        firstname: "John",
        lastnae: "Doe",
        accessLevel: 1
      },
    })

    render(<SetStatusButton currentlyReading={mockCurrentlyReading} book={mockBook} setCurrent={jest.fn()} />);

    const button = screen.queryByText("EDIT STATUS");
    expect(button).not.toBeInTheDocument();
  });
});
