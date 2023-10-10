import { Meeting } from "./Meeting";
import { Meetings } from "@prisma/client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: {
      username: "johndoe",
      firstname: "John",
      lastname: "Doe",
      accessLevel: 1,
    },
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

const useSessionMock = useSession as any;

describe("Meeting", () => {
  it("should render the meeting title", () => {
    render(<Meeting {...mockMeeting} />);

    const title = screen.getByText(mockMeeting.title);
    expect(title).toBeInTheDocument();
  });

  it("should render the meeting date", () => {
    render(<Meeting {...mockMeeting} />);

    const date = screen.getByText(
      mockMeeting.dateOfMeeting.toDateString().split(" ").slice(1).join(" ")
    );
    expect(date).toBeInTheDocument();
  });

  it("should render the meeting time", () => {
    render(<Meeting {...mockMeeting} />);

    const time = screen.getByText(
      mockMeeting.dateOfMeeting.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    expect(time).toBeInTheDocument();
  });

  it("should render the meeting link", () => {
    render(<Meeting {...mockMeeting} />);

    const link = screen.getByText(mockMeeting.link);
    expect(link).toBeInTheDocument();
  });

  it("should render the meeting description", () => {
    render(<Meeting {...mockMeeting} />);

    const description = screen.getByText(mockMeeting.description);
    expect(description).toBeInTheDocument();
  });

  it("should render the 'Edit Meeting' and 'Delete Meeting' buttons if the user has access level 3", () => {
    useSessionMock.mockReturnValue({
      data: {
        username: "johndoe",
        firstname: "John",
        lastnae: "Doe",
        accessLevel: 3,
      },
    });

    render(<Meeting {...mockMeeting} />);

    const moreButton = screen.getByTestId("more-button");
    fireEvent(moreButton, new MouseEvent("click"));

    waitFor(() => {
      const editMeetingButton = screen.getByText("Edit");
      const deleteMeetingButton = screen.getByText("Delete");
      expect(editMeetingButton).toBeInTheDocument();
      expect(deleteMeetingButton).toBeInTheDocument();
    });
  });

  it("should not render the 'Edit Meeting' and 'Delete Meeting' buttons if the user does not have access level 3", () => {
    render(<Meeting {...mockMeeting} />);

    const moreButton = screen.getByTestId("more-button");
    fireEvent(moreButton, new MouseEvent("click"));

    waitFor(() => {
      const editMeetingButton = screen.getByText("Edit");
      const deleteMeetingButton = screen.getByText("Delete");
      expect(editMeetingButton).toBeNull();
      expect(deleteMeetingButton).toBeNull();
    });
  });
});
