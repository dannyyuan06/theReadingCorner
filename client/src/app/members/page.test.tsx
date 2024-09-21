import "@testing-library/jest-dom";
import Members from "./page";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => {
  const searchParams = {
    get: jest.fn().mockReturnValue(""),
  };
  return {
    useRouter: () => ({
      push: jest.fn(),
      refresh: jest.fn(),
    }),
    useSearchParams: () => searchParams,
  };
});

global.fetch = jest.fn().mockImplementation(() => ({
  json: () => ([
    {
      username: "JohnDoe",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@email.com",
      joinDate: new Date("2023-08-04T12:00:00.000Z"),
      lastOnline: new Date("2023-08-05T12:00:00.000Z"),
      profilePicture: "/images/profile-picture.png",
      accessLevel: 1,
    },
    {
      username: "JackWoolterton",
      firstName: "Jack",
      lastName: "Woolterton",
      email: "jwool@email.com",
      joinDate: new Date("2023-08-04T12:00:00.000Z"),
      lastOnline: new Date("2023-08-05T12:00:00.000Z"),
      profilePicture: "/images/profile-picture.png",
      accessLevel: -1,
    },
    {
      username: "dannyyuan",
      firstName: "Danny",
      lastName: "Yuan",
      email: "dannyyuan@email.com",
      joinDate: new Date("2023-08-04T12:00:00.000Z"),
      lastOnline: new Date("2023-08-05T12:00:00.000Z"),
      profilePicture: "/images/profile-picture.png",
      accessLevel: 3,
    },
  ]),
}));

describe("Members page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the page correctly", async () => {
    await act(async () => {
      render(<Members />);
    });

    const members = screen.getByText("MEMBERS");
    expect(members).toBeInTheDocument();

    const usernameElement = screen.getByText("USERNAME");
    expect(usernameElement).toBeInTheDocument();

    const nameElement = screen.getByText("NAME");
    expect(nameElement).toBeInTheDocument();

    const dateJoinedElement = screen.getByText("DATE JOINED");
    expect(dateJoinedElement).toBeInTheDocument();

    const lastOnlineElement = screen.getByText("LAST ONLINE");
    expect(lastOnlineElement).toBeInTheDocument();

    const emailElement = screen.getByText("EMAIL");
    expect(emailElement).toBeInTheDocument();

    const accessLevelElement = screen.getByText("ACCESS");
    expect(accessLevelElement).toBeInTheDocument();
  });
  it("should render the information of the users in a list", async () => {
    await act(async () => {
      render(<Members />);
    });

    const username1 = screen.getByText("JohnDoe");
    expect(username1).toBeInTheDocument();

    const name = screen.getByText("John Doe");
    expect(name).toBeInTheDocument();

    const email = screen.getByText("johndoe@email.com");
    expect(email).toBeInTheDocument();

    const dataJoined = screen.getAllByText("Aug 04 2023");
    expect(dataJoined.length).toEqual(3)

    const lastOnline = screen.getAllByText("Aug 05 2023");
    expect(lastOnline.length).toEqual(3);

    const access = screen.getByText("User");
    expect(access).toBeInTheDocument();

    const blockedAccess = screen.getByText("Blocked");
    expect(blockedAccess).toBeInTheDocument();

    const adminAccess = screen.getByText("Admin");
    expect(adminAccess).toBeInTheDocument();

    const username2 = screen.getByText("JackWoolterton");
    expect(username2).toBeInTheDocument();

    const username3 = screen.getByText("dannyyuan");
    expect(username3).toBeInTheDocument();
  });
  it("should send a fetch request when a user is being deleted", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<Members />);
    });

    expect(fetch).toBeCalledTimes(1)

    const moreButtonElements = screen.getAllByTestId("more-button");
    await user.click(moreButtonElements[0]);

    const deleteAccountButton = screen.getByText("Delete account");
    await user.click(deleteAccountButton);

    const confirmButton = screen.getByText("Confirm");
    await user.click(confirmButton)

    expect(fetch).toBeCalledTimes(2)
  });
  it("should send a fetch request when a user is being disabled", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<Members />);
    });

    expect(fetch).toBeCalledTimes(1)

    const moreButtonElements = screen.getAllByTestId("more-button");
    await user.click(moreButtonElements[0]);

    const deleteAccountButton = screen.getByText("Disable account");
    await user.click(deleteAccountButton);

    const confirmButton = screen.getByText("Confirm");
    await user.click(confirmButton)

    expect(fetch).toBeCalledTimes(2)
  });
  it("should send a fetch request when a user is being disabled", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<Members />);
    });

    expect(fetch).toBeCalledTimes(1)

    const moreButtonElements = screen.getAllByTestId("more-button");
    await user.click(moreButtonElements[0]);

    const deleteAccountButton = screen.getByText("Reset password");
    await user.click(deleteAccountButton);

    const confirmButton = screen.getByText("Confirm");
    await user.click(confirmButton)

    expect(fetch).toBeCalledTimes(2)
  });
  it("should send a fetch request when a user is being enabled", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<Members />);
    });

    expect(fetch).toBeCalledTimes(1)

    const moreButtonElements = screen.getAllByTestId("more-button");
    await user.click(moreButtonElements[1]);

    const deleteAccountButton = screen.getByText("Enable account");
    await user.click(deleteAccountButton);

    const confirmButton = screen.getByText("Confirm");
    await user.click(confirmButton)

    expect(fetch).toBeCalledTimes(2)
  });
});
