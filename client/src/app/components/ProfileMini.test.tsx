import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProfileMini } from "./ProfileMini";
import { ProfileFriendType } from "@/models/User";

jest.mock("./ProfileDropDown", () => ({
  ProfileDropDown: () => <div>Tooltip</div>,
}));

const mockUser: ProfileFriendType = {
  username: "JohnDoe",
  firstName: "John",
  lastName: "Doe",
  joinDate: new Date("2023-08-04T12:00:00.000Z"),
  lastOnline: new Date("2023-08-05T12:00:00.000Z"),
  profilePicture: "/images/profile-picture.png",
  accessLevel: 1,
};

describe("Profile Mini component", () => {
  it("should render the component correctly", () => {
    render(<ProfileMini user={mockUser} dateSent="04/10/2023" />);

    const username = screen.getByText("JohnDoe");
    expect(username).toBeInTheDocument();

    const dateSent = screen.getByText("04/10/2023");
    expect(dateSent).toBeInTheDocument();
  });
  it("should not render and admin tag for an access level lower than 3", () => {
    render(<ProfileMini user={mockUser} dateSent="04/10/2023" />);

    const adminTag = screen.queryByText("ADMIN");
    expect(adminTag).toBeNull();
  });
  it("should render and admin tag for an access level equal to 3", () => {
    render(<ProfileMini user={{...mockUser, accessLevel: 3}} dateSent="04/10/2023" />);

    const adminTag = screen.queryByText("ADMIN");
    expect(adminTag).toBeInTheDocument();
  });
});
