import { render, screen } from "@testing-library/react";
import { ProfileStandard } from "./ProfileStandard";
import { MemberType } from "@/models/User";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockUser: MemberType = {
  username: "testuser",
  firstName: "Test",
  lastName: "User",
  profilePicture: "https://example.com/user-profile-pictures/testuser.jpg",
  joinDate: new Date("2023-08-04T12:00:00.000Z"),
  lastOnline: new Date("2023-08-04T13:00:00.000Z"),
  email: "testuser@example.com",
  accessLevel: 1,
};

describe("ProfileStandard", () => {
  it("should render the correct components", () => {
    render(<ProfileStandard user={mockUser} setUsers={jest.fn()} index={0}/>);

    const profileContainerElement = screen.getByTestId("profile-standard");
    expect(profileContainerElement).toBeInTheDocument();

    const imageLinkElement = screen.getAllByRole("link");
    expect(imageLinkElement.length).toEqual(2)

    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();

    const titleSplitElements = screen.getAllByTestId("title-split")
    expect(titleSplitElements.length).toEqual(6);

    const moreButtonElement = screen.getByRole("button");
    expect(moreButtonElement).toBeInTheDocument();
  });

  it("should render the correct information for the user", () => {
    render(<ProfileStandard user={mockUser} setUsers={jest.fn()} index={0}/>);

    const usernameElement = screen.getByText(mockUser.username);
    expect(usernameElement).toBeInTheDocument();

    const nameElement = screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`);
    expect(nameElement).toBeInTheDocument();

    const joinDateElement = screen.getAllByText(
      new Date(mockUser.joinDate).toDateString().split(" ").slice(1).join(" ")
    );
    expect(joinDateElement.length).toEqual(2);

    const lastOnlineElement = screen.getAllByText(
      new Date(mockUser.lastOnline)
        .toDateString()
        .split(" ")
        .slice(1)
        .join(" ")
    );
    expect(lastOnlineElement.length).toEqual(2);

    const emailElement = screen.getByText(mockUser.email);
    expect(emailElement).toBeInTheDocument();

    const accessLevelElement = screen.getByText("User");
    expect(accessLevelElement).toBeInTheDocument();
  });

  it("should render the correct more buttons for the user's access level 3", async () => {
    const user = userEvent.setup()
    render(<ProfileStandard user={{...mockUser, accessLevel: 3}} setUsers={jest.fn()} index={0}/>);

    const moreButtonElement = screen.getByTestId("more-button")
    expect(moreButtonElement).toBeInTheDocument();
    await user.click(moreButtonElement)

    const moreButtonOptions = screen.getAllByTestId("drop-down-menu-button")
    expect(moreButtonOptions.length).toEqual(3);

    expect(moreButtonOptions[0].textContent).toEqual("Reset password");
    expect(moreButtonOptions[1].textContent).toEqual("Delete account");
    expect(moreButtonOptions[2].textContent).toEqual("Disable account");
  });
  it("should render the correct more buttons for the user's access level -1", async () => {
    const user = userEvent.setup()
    render(<ProfileStandard user={{...mockUser, accessLevel: -1}} setUsers={jest.fn()} index={0}/>);

    const moreButtonElement = screen.getByTestId("more-button")
    expect(moreButtonElement).toBeInTheDocument();
    await user.click(moreButtonElement)

    const moreButtonOptions = screen.getAllByTestId("drop-down-menu-button")
    expect(moreButtonOptions.length).toEqual(3);

    expect(moreButtonOptions[0].textContent).toEqual("Reset password");
    expect(moreButtonOptions[1].textContent).toEqual("Delete account");
    expect(moreButtonOptions[2].textContent).toEqual("Enable account");
  });
});
