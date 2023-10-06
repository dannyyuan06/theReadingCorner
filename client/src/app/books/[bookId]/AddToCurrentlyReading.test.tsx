import { prettyDOM, render, screen } from "@testing-library/react";
import { AddToCurrentlyReading } from "./AddToCurrentlyReading";
import { BookType, bookexample } from "@/app/bookexample";
import { useSession } from "next-auth/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: {
      username: "testuser",
      profilePicture: "https://example.com/profile-picture.jpg",
      accessLevel: 3,
    },
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn()
  })
}))

global.fetch = jest.fn()

const mockBook: BookType = bookexample[1]

describe("AddToCurrentlyReading", () => {
  it("should render the button if the user is logged in and has the right access level", () => {
    render(<AddToCurrentlyReading book={mockBook} />);
    
    const buttonElement = screen.getByText("SET AS CURRENTLY READING");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should not render the button if the user is not logged in", () => {
    (useSession as any).mockReturnValueOnce({})

    render(<AddToCurrentlyReading book={mockBook} />);

    const buttonElement = screen.queryByText("SET AS CURRENTLY READING");
    expect(buttonElement).toBeNull();
  });

  it("should not render the button if the user does not have the right access level", () => {
    (useSession as any).mockReturnValueOnce({
      data: {
        accessLevel: 1
      }
    })

    render(<AddToCurrentlyReading book={mockBook} />);

    const buttonElement = screen.queryByText("SET AS CURRENTLY READING");
    expect(buttonElement).toBeNull();
  });

  it("should render the confirmation popup when the button is clicked", async () => {
    const user = userEvent.setup()
    render(<AddToCurrentlyReading book={mockBook} />);

    const buttonElement = screen.getByText("SET AS CURRENTLY READING");
    await user.click(buttonElement)

    const popupElement = screen.getByTestId("popup")
    expect(popupElement).toBeInTheDocument();
  });

  it("should submit the form when the 'Confirm' button is clicked", async () => {
    const user = userEvent.setup()

    render(<AddToCurrentlyReading book={mockBook} />);

    const buttonElement = screen.getByText("SET AS CURRENTLY READING");
    await user.click(buttonElement)
    
    const confirmButtonElement = screen.getByText("Confirm");
    await user.click(confirmButtonElement)

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
