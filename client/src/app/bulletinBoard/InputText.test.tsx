import { InputText } from "./InputText";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useDispatch } from "react-redux";
import styles from "./InputText.module.css";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: {
      username: "testuser",
      profilePicture: "https://example.com/profile-picture.jpg",
    },
  })),
}));

jest.mock("../../redux/store", () => ({
  useAppSelector: jest.fn(() => false),
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

const mockUseDispatch = useDispatch as any;

describe("InputText", () => {
  it("should render the input field", () => {
    render(<InputText />);

    const inputField = screen.getByTestId("input-text");
    expect(inputField).toBeInTheDocument();
  });

  it("should render the send button", () => {
    render(<InputText />);

    const sendButton = screen.getByText("SEND");
    expect(sendButton).toBeInTheDocument();
  });

  it("should disable the send button if the input field is empty", () => {
    render(<InputText />);

    const sendButton = screen.getByText("SEND");
    expect(sendButton).toHaveClass(styles.toolbarButtonCant);
  });

  it("should enable the send button if the input field is not empty", async () => {
    render(<InputText />);

    const inputField = screen.getByTestId("input-text");
    fireEvent.input(inputField, {
      target: { textContent: "This is a test message." },
    });

    const sendButton = screen.getByText("SEND");
    await waitFor(() => {
      expect(sendButton).not.toHaveClass(styles.toolbarButtonCant);
    });
  });

  it("should call the dispatch function when the send button is clicked", async () => {
    const user = userEvent.setup();
    const dispatchMock = jest.fn();
    mockUseDispatch.mockReturnValue(dispatchMock);

    render(<InputText />);

    const inputField = screen.getByTestId("input-text");
    await user.click(inputField)
    await user.type(inputField, "This is a test message.")

    const sendButton = screen.getByText("SEND");
    await user.click(sendButton)

    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });
});
