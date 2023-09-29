import { SetStatus } from "./SetStatus";
import { Book, CurrentlyReading } from "@prisma/client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

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

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}))

describe("SetStatus", () => {
  it("should render a DropDownButton with the list of status options", () => {
    render(<SetStatus currentlyReading={mockCurrentlyReading} book={mockBook} setClicked={jest.fn()} setCurrent={jest.fn()} />);

    const button = screen.getByTestId("drop-down-button")

    fireEvent(button, new MouseEvent("click"))

    waitFor(() => {
      const dropDownButton = screen.getByTestId("drop-down-menu");
      expect(dropDownButton).toBeInTheDocument();

      const statusOptions = dropDownButton.querySelectorAll("button");
      expect(statusOptions.length).toBe(5);
      expect(statusOptions[0].textContent).toBe("Haven't Read");
      expect(statusOptions[1].textContent).toBe("Reading");
      expect(statusOptions[2].textContent).toBe("Finished");
      expect(statusOptions[3].textContent).toBe("On Hold");
      expect(statusOptions[4].textContent).toBe("Dropped");
    })
  });

  it("should render an input field for the page number", () => {
    render(<SetStatus currentlyReading={mockCurrentlyReading} book={mockBook} setClicked={jest.fn()} setCurrent={jest.fn()} />);

    const pageNumberInput = screen.getByRole("textbox");
    expect(pageNumberInput).toBeInTheDocument();
  });

  it("should render an input field for the affiliate link", () => {
    render(<SetStatus currentlyReading={mockCurrentlyReading} book={mockBook} setClicked={jest.fn()} setCurrent={jest.fn()} />);

    const affiliateLinkInput = screen.getByRole("textbox");
    expect(affiliateLinkInput).toBeInTheDocument();
  });

  it("should call the submitHandler function when the submit button is clicked", () => {
    const mockSubmitHandler = jest.fn();

    render(<SetStatus currentlyReading={mockCurrentlyReading} book={mockBook} setClicked={jest.fn()} setCurrent={jest.fn()} />);

    const submitButton = screen.getByText("Confirm");
    fireEvent(submitButton, new MouseEvent("click"))

    waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalled();
    })
  });
});
