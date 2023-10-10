import { EditMeeting } from "./EditMeeting";
import { Meetings } from "@prisma/client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

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

const mockMeeting: Meetings = {
  meetingid: 1,
  title: "Meeting 1",
  dateOfMeeting: new Date("2023-10-01"),
  description: "This is the first meeting.",
  host: "John Doe",
  link: "https://example.com/meeting-1",
  imageLink: "https://example.com/meeting-1.jpg",
};

global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  }) as any

describe("EditMeeting", () => {
  it("should render the edit meeting form", () => {
    render(<EditMeeting meetingDetails={mockMeeting} setClicked={() => {}} />);

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

  it("should submit the edited meeting when the user clicks the submit button", () => {

    render(<EditMeeting meetingDetails={mockMeeting} setClicked={() => {}}/>);

    const submitButton = screen.getByText("Confirm");
    fireEvent(submitButton, new MouseEvent("click"))

    waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    })
  });
});
