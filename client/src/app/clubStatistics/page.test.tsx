import Pages from "@/models/Pages";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import clubStatistics from "./page";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const averageRating1 = [
  {
    currentlyReadingBook: {
      bookid: "123085",
      affiliateLink: "www.amazon.co.uk",
      book: {
        averageRating: -1,
        title: "Hitchhiker's Guide to the Galaxy",
      },
      dateStarted: new Date("2023-08-04T12:00:00.000Z"),
      pageNumber: 2,
      readid: 1,
      status: 3,
    },
    bookSuggestions: [
      {
        book: {
          author: "Douglas Adams",
          averageRating: -1,
          bookPicture: "/images/book-placeholder.png",
          bookid: "1532tio",
          description: "42",
          pageCount: 42,
          title: "Hitchhiker's Guide to the Galaxy",
        },
        bookid: "1532tio",
        booksuggestionid: 3,
        username: "JohnDoe",
      },
    ],
    booksRead: 72,
    bulletinEngagement: 0.02,
    genreSuggestions: [
      {
        genre: "fiction",
        genresuggestionid: 32,
        username: "JohnDoe",
      },
    ],
    numberOfMembers: 3,
  },
  "",
];

jest.mock("../../models/Pages", () => ({
  statistics: jest.fn().mockReturnValue([
    {
      currentlyReadingBook: {
        bookid: "123085",
        affiliateLink: "www.amazon.co.uk",
        book: {
          averageRating: 2,
          title: "Hitchhiker's Guide to the Galaxy",
        },
        dateStarted: new Date("2023-08-04T12:00:00.000Z"),
        pageNumber: 2,
        readid: 1,
        status: 3,
      },
      bookSuggestions: [
        {
          book: {
            author: "Douglas Adams",
            averageRating: 2,
            bookPicture: "/images/book-placeholder.png",
            bookid: "1532tio",
            description: "42",
            pageCount: 42,
            title: "Hitchhiker's Guide to the Galaxy",
          },
          bookid: "1532tio",
          booksuggestionid: 3,
          username: "JohnDoe",
        },
      ],
      booksRead: 72,
      bulletinEngagement: 0.02,
      genreSuggestions: [
        {
          genre: "fiction",
          genresuggestionid: 32,
          username: "JohnDoe",
        },
      ],
      numberOfMembers: 3,
    },
    "",
  ]),
}));

describe("Club Statistics Page", () => {
  it("should render the page correctly", async () => {
    render(await clubStatistics());
    const title = screen.getByText("CLUB STATISTICS");
    expect(title).toBeInTheDocument();

    const statsTitle = screen.getByText("QUICK STATS");
    expect(statsTitle).toBeInTheDocument();

    const booksTitle = screen.getByText("SUGGESTED BOOKS");
    expect(booksTitle).toBeInTheDocument();

    const genresTitle = screen.getByText("SUGGESTED GENRES");
    expect(genresTitle).toBeInTheDocument();
  });
  it("should display the currently reading book", async () => {
    render(await clubStatistics());

    const currentlyReadingBookText = screen.getByText("CURRENTLY READING BOOK");
    expect(currentlyReadingBookText).toBeInTheDocument();

    const currentlyReadingBook = screen.getAllByText(
      "Hitchhiker's Guide to the Galaxy"
    );
    expect(currentlyReadingBook[0]).toBeInTheDocument();
  });
  it("should display the average rating", async () => {
    render(await clubStatistics());

    const averageRatingTitle = screen.getByText("AVERAGE RATING");
    expect(averageRatingTitle).toBeInTheDocument();

    const averageRating = screen.getByText("2.00");
    expect(averageRating).toBeInTheDocument();
  });
  it("should display No Readers if the average rating is -1", async () => {
    (Pages.statistics as any).mockReturnValueOnce(averageRating1);

    render(await clubStatistics());

    const averageRatingTitle = screen.getByText("AVERAGE RATING");
    expect(averageRatingTitle).toBeInTheDocument();

    const averageRating = screen.getByText("No Readers");
    expect(averageRating).toBeInTheDocument();
  });
  it("should display the number of members", async () => {
    (Pages.statistics as any).mockReturnValueOnce(averageRating1);

    render(await clubStatistics());

    const numberOfMembersTitle = screen.getByText("NUMBER OF MEMBERS");
    expect(numberOfMembersTitle).toBeInTheDocument();

    const numberOfMembers = screen.getByText("3");
    expect(numberOfMembers).toBeInTheDocument();
  });
  it("should display the number of books read", async () => {
    render(await clubStatistics());

    const numberOfMembersTitle = screen.getByText("NUMBER OF BOOKS READ");
    expect(numberOfMembersTitle).toBeInTheDocument();

    const numberOfMembers = screen.getByText("72");
    expect(numberOfMembers).toBeInTheDocument();
  });
  it("should display the bulletin engagement", async () => {
    render(await clubStatistics());

    const numberOfMembersTitle = screen.getByText("BULLETIN ENGAGEMENT");
    expect(numberOfMembersTitle).toBeInTheDocument();

    const numberOfMembers = screen.getByText("2.0%");
    expect(numberOfMembers).toBeInTheDocument();
  });
  it("should render one book", async () => {
    render(await clubStatistics());

    const bookAttachment = screen.getByTestId("book-attachment");
    expect(bookAttachment).toBeInTheDocument();

    const currentlyReadingBook = screen.getAllByText(
      "Hitchhiker's Guide to the Galaxy"
    );
    expect(currentlyReadingBook[1]).toBeInTheDocument();
  });
  it("should render one genre suggestion", async () => {
    render(await clubStatistics());

    const genreAttachment = screen.getByTestId("genre-attachment");
    expect(genreAttachment).toBeInTheDocument();

    const genreTitle = screen.getByText("fiction");
    expect(genreTitle).toBeInTheDocument();
  });
});
