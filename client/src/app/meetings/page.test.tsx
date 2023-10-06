import meetings from "./page";
import { render, screen } from "@testing-library/react";
import { headers } from "next/dist/client/components/headers";
import "@testing-library/jest-dom";

jest.mock("../../models/Meetings", () => ({
  Meetings: {
    getMeetings: jest.fn(() => [
      {
        meetingid: 1,
        title: "Meeting 1",
        description: "This is the first meeting.",
        dateOfMeeting: new Date("2023-10-01"),
        link: "https://example.com/meeting-1",
        imageLink: "https://example.com/meeting-1.jpg",
        host: "John Doe",
      },
      {
        meetingid: 2,
        title: "Meeting 2",
        description: "This is the second meeting.",
        dateOfMeeting: new Date("2023-10-02"),
        link: "https://example.com/meeting-2",
        imageLink: "https://example.com/meeting-2.jpg",
        host: "Jane Doe",
      },
      {
        meetingid: 3,
        title: "Meeting 3",
        description: "This is the third meeting.",
        dateOfMeeting: new Date("2023-10-03"),
        link: "https://example.com/meeting-3",
        imageLink: "https://example.com/meeting-3.jpg",
        host: "Janet Doe",
      },
    ]),
  },
}));

jest.mock("next/dist/client/components/headers", () => ({
  headers: jest.fn(() => ({
    get: jest.fn().mockReturnValue("1"),
  })),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { 
      username: "johndoe",
      firstname: "John",
      lastnae: "Doe",
      accessLevel: 3
    },
  })),
}));

const headersMock = headers as any

describe("meetings", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should render a PageHeader with the text 'MEETINGS'", async () => {
    render(await meetings());

    const pageHeader = screen.getByText("MEETINGS");
    expect(pageHeader).toBeInTheDocument();
  });

  it("should render a Meeting component for the first meeting", async () => {
    render(await meetings());

    const meeting = screen.getByTestId("meeting");
    expect(meeting).toBeInTheDocument();
  });

  it("should render a FutureMeeting component for each future meeting", async () => {
    render(await meetings());

    const futureMeetings = screen.getAllByTestId("future-meeting");
    expect(futureMeetings.length).toBe(2);
  });
});
