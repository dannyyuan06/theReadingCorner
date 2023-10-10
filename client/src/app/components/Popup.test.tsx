import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Popup } from "./Popup";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

describe("Popup component", () => {
  it("should render the component properly", () => {
    const submitMock = jest.fn();
    const setClickedMock = jest.fn();
    render(
      <Popup
        title="Test Popup"
        confirm={submitMock}
        setClicked={setClickedMock}
      >
        Some random pieces of text
      </Popup>
    );
    const text = screen.getByText("Some random pieces of text");
    expect(text).toBeInTheDocument();

    const title = screen.getByText("Test Popup");
    expect(title).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();

    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toBeInTheDocument();
  });
  it("should call the submit function when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const submitMock = jest.fn();
    const setClickedMock = jest.fn();
    render(
      <Popup
        title="Test Popup"
        confirm={submitMock}
        setClicked={setClickedMock}
      >
        Some random pieces of text
      </Popup>
    );
    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);

    expect(setClickedMock).toBeCalledWith(false);
  });
  it("should call the submit function when confirm button is clicked", async () => {
    const user = userEvent.setup();
    const submitMock = jest.fn();
    const setClickedMock = jest.fn();
    render(
      <Popup
        title="Test Popup"
        confirm={submitMock}
        setClicked={setClickedMock}
      >
        Some random pieces of text
      </Popup>
    );
    const confirmButton = screen.getByText("Confirm");
    await user.click(confirmButton);

    expect(submitMock).toBeCalled();
  });
});
