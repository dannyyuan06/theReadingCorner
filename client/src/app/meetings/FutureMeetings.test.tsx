import { FutureMeeting } from "./FutureMeetings";
import { Meetings } from "@prisma/client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { accessLevel: 3 },
  })),
}));

const mockMeeting: Meetings = {
  meetingid: 1,
  title: "Meeting 1",
  dateOfMeeting: new Date("2023-10-01"),
  description: "This is the first meeting.",
  host: "John Doe",
  link: "https://example.com/meeting-1",
  imageLink: "https://example.com/meeting-1.jpg",
};

const useSessionMock = useSession as any

describe("FutureMeeting", () => {
  it("should render the 'Edit Meeting' and 'Delete Meeting' buttons if the user has access level 3", async () => {
    const user = userEvent.setup()
    render(<FutureMeeting {...mockMeeting} />);

    const moreButton = screen.getByTestId("more-button")
    await user.click(moreButton)

    const editMeetingButton = screen.getByText("Edit");
    const deleteMeetingButton = screen.getByText("Delete");
    expect(editMeetingButton).toBeInTheDocument();
    expect(deleteMeetingButton).toBeInTheDocument();
  });

  it("should not render the 'Edit Meeting' and 'Delete Meeting' buttons if the user does not have access level 3", () => {
    useSessionMock.mockReturnValue({
      data: { 
        username: "johndoe",
        firstname: "John",
        lastnae: "Doe",
        accessLevel: 1
      },
    })

    const moreButton = screen.queryByTestId("more-button");
    expect(moreButton).toBeNull();
  });
});
