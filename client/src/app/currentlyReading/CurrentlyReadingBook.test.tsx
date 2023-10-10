import { CurrentlyReadingBook } from "./CurrentlyReadingBook";
import { getCurrentlyReadingBooksType } from "@/models/CurrentlyReading";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

const books: getCurrentlyReadingBooksType[] = [
  {
    readid: 1,
    book: {
      bookid: "1",
      bookPicture: "https://example.com/book-cover.jpg",
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      description:
        "A humorous science fiction comedy series created by Douglas Adams. Originally a radio comedy broadcast on BBC Radio 4 in 1978, it was later adapted to other formats, including stage shows, novels, comic books, a 1981 TV series, a 1984 computer game, and 2005 feature film.",
      pageCount: 200,
      averageRating: 4.5,
    },
    bookid: "1",
    affiliateLink:
      "https://www.amazon.com/The-Hitchhikers-Guide-to-the-Galaxy-Douglas-Adams/dp/0330258648",
    dateStarted: new Date("2023-09-29T19:17:38.000Z"),
    pageNumber: 100,
    status: 1,
  },
  {
    readid: 2,
    book: {
      bookid: "2",
      bookPicture: "https://example.com/book-cover.jpg",
      title: "The Restaurant at the End of the Universe",
      author: "Douglas Adams",
      description:
        "The second book in the Hitchhiker's Guide to the Galaxy comedy series by Douglas Adams. Like the first novel, it is a humorous science fiction adventure story featuring the hapless Arthur Dent.",
      pageCount: 256,
      averageRating: 4.7,
    },
    bookid: "2",
    affiliateLink:
      "https://www.amazon.com/The-Restaurant-at-the-End-of-the-Universe-Douglas-Adams/dp/0330258656",
    dateStarted: new Date("2023-09-20T19:17:38.000Z"),
    pageNumber: 200,
    status: 2,
  },
];

jest.mock("../../models/CurrentlyReading", () => {
  return {
    getCurrentlyReadingBooks: jest.fn(),
  };
});

jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({
    data: {
      username: "testing",
      firstname: "John",
      lastname: "Doe",
    },
  }),
}));

describe("CurrentlyReadingBook", () => {
  it("should render the book title", () => {

    const wrapper = render(
      <CurrentlyReadingBook currentlyReading={books[0]} />
    );

      expect(
        wrapper.getByText("The Hitchhiker's Guide to the Galaxy")
      ).toBeInTheDocument();
  });

  it("should render the book author", () => {
    const wrapper = render(
      <CurrentlyReadingBook currentlyReading={books[0]} />
    );

    expect(wrapper.getByText("AUTHOR: Douglas Adams")).toBeInTheDocument();
  });

  it("should render the book start date", () => {

    const wrapper = render(
      <CurrentlyReadingBook currentlyReading={books[0]} />
    );

    expect(wrapper.getByText("Sep 29 2023")).toBeInTheDocument();
  });

  it("should render the book page number", () => {

    const wrapper = render(
      <CurrentlyReadingBook currentlyReading={books[0]} />
    );

    expect(wrapper.getByText("100/200")).toBeInTheDocument();
  });

  it("should render the book status", () => {

    const wrapper = render(
      <CurrentlyReadingBook currentlyReading={books[0]} />
    );

    expect(wrapper.getByText("Reading")).toBeInTheDocument();
  });

  it("should render the book affiliate link", () => {

    const wrapper = render(
      <CurrentlyReadingBook currentlyReading={books[0]} />
    );

    expect(wrapper.getByText("LINK")).toBeInTheDocument();
  });

  it("should render the book description", () => {
    const wrapper = render(
      <CurrentlyReadingBook currentlyReading={books[0]} />
    );

    expect(
      wrapper.getByText("A humorous science fiction comedy series created by Douglas Adams. Originally a radio comedy broadcast on BBC Radio 4 in 1978, it was later adapted to other formats, including stage shows, novels, comic books, a 1981 TV series, a 1984 computer game, and 2005 feature film.")
    ).toBeInTheDocument();
  });
});