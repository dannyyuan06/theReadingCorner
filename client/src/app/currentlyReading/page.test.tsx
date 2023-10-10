import { CurrentlyReading } from "@/models/CurrentlyReading";
import currentlyReading from "./page";

const CurrentlyReadingModel:any = CurrentlyReading

jest.mock("../../models/CurrentlyReading", () => {
  return {
    CurrentlyReading: {
      getCurrentlyReadingBooks: jest.fn()
    }
  }
});

describe("currentlyReading", () => {
  it("should return an empty page if there are no currently reading books", async () => {
    // Mock the getCurrentlyReadingBooks function to return an empty array
    CurrentlyReadingModel.getCurrentlyReadingBooks.mockResolvedValueOnce([[]]);

    const result = await currentlyReading();

    expect(result).toMatchInlineSnapshot(`
      <div>
        <PageHeader>
          CURRENTLY READING
        </PageHeader>
        <h2>
          Nothing to see here
        </h2>
      </div>
    `);
  });

  it("should render a CurrentlyReadingBook component for the current book", async () => {
    const currentlyReadingBook = {
      readid: 1,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      startDate: "2023-09-29",
      endDate: null,
    };

    // Mock the getCurrentlyReadingBooks function to return an array with the current book
    CurrentlyReadingModel.getCurrentlyReadingBooks.mockResolvedValueOnce([
      [currentlyReadingBook],
    ]);

    const result = await currentlyReading();

    expect(result).toMatchInlineSnapshot(`
      <div>
        <PageHeader>
          CURRENTLY READING
        </PageHeader>
        <CurrentlyReadingBook
          currentlyReading={
            {
              "author": "Douglas Adams",
              "endDate": null,
              "readid": 1,
              "startDate": "2023-09-29",
              "title": "The Hitchhiker's Guide to the Galaxy",
            }
          }
        />
      </div>
    `);
  });

  it("should render a PastReadingBook component for each previous book", async () => {
    const currentlyReadingBook = {
      readid: 1,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      startDate: "2023-09-29",
      endDate: null,
    };

    const previousBook = {
      readid: 2,
      title: "The Restaurant at the End of the Universe",
      author: "Douglas Adams",
      startDate: "2023-09-22",
      endDate: "2023-09-28",
    };

    // Mock the getCurrentlyReadingBooks function to return an array with the current book and the previous book
    CurrentlyReadingModel.getCurrentlyReadingBooks.mockResolvedValueOnce([
      [currentlyReadingBook, previousBook],
    ]);

    const result = await currentlyReading();

    expect(result).toMatchInlineSnapshot(`
      <div>
        <PageHeader>
          CURRENTLY READING
        </PageHeader>
        <CurrentlyReadingBook
          currentlyReading={
            {
              "author": "Douglas Adams",
              "endDate": null,
              "readid": 1,
              "startDate": "2023-09-29",
              "title": "The Hitchhiker's Guide to the Galaxy",
            }
          }
        />
        <h2
          className="previousBooks"
        >
          PREVIOUS BOOKS
        </h2>
        <PastReadingBook
          currentlyReading={
            {
              "author": "Douglas Adams",
              "endDate": "2023-09-28",
              "readid": 2,
              "startDate": "2023-09-22",
              "title": "The Restaurant at the End of the Universe",
            }
          }
        />
      </div>
    `);
  });
});
