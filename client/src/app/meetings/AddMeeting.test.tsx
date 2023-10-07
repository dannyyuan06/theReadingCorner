import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddMeeting } from "./AddMeeting";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { accessLevel: 3 },
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: () => {}
  })
}))

global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  }) as any

describe("AddMeeting component", () => {
  it("should render the add meeting form", async () => {
    const user = userEvent.setup();
    render(<AddMeeting />);

    const button = screen.getByRole("button");
    await user.click(button);

    const titleInput = screen.getByText("MEETING TITLE");
    const hostInput = screen.getByText("HOST");
    const dateInput = screen.getByText("DATE");
    const linkInput = screen.getByText("LINK");
    const descriptionInput = screen.getByText("DESCRIPTION");
    const imageInput = screen.getByText("IMAGE");

    expect(titleInput).toBeInTheDocument();
    expect(hostInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(linkInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
  });

  it("should submit the edited meeting when the user clicks the submit button", async () => {
    const user = userEvent.setup();
    render(<AddMeeting />);

    const button = screen.getByRole("button");
    await user.click(button);

    const submitButton = screen.getByText("Confirm");
    fireEvent(submitButton, new MouseEvent("click"))

    waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    })
  });
});
