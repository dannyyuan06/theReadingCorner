import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProfileDropDown } from "./ProfileDropDown";
import { ProfileFriendType } from "@/models/User";

const mockUser: ProfileFriendType = {
  username: "JohnDoe",
  firstName: "John",
  lastName: "Doe",
  joinDate: new Date("2023-08-04T12:00:00.000Z"),
  accessLevel: 1,
  profilePicture: "/images/profile-picture.png",
  lastOnline: new Date(),
};

describe("Profile Drop Down Component", () => {
  it("should render the component correctly", () => {
    render(<ProfileDropDown user={mockUser} />);

    const name = screen.getByText("John Doe");
    expect(name).toBeInTheDocument();

    const lastOnline = screen.getByText("Last Logged In: Now");
    expect(lastOnline).toBeInTheDocument();

    const joinDate = screen.getByText("Join Date: Aug 04 2023");
    expect(joinDate).toBeInTheDocument();
  });
  it("should not render an Admin tag for access level lower than 3", () => {
    render(<ProfileDropDown user={mockUser} />);

    const adminTag = screen.queryByText("ADMIN");
    expect(adminTag).toBeNull();
  });
  it("should render an Admin tag for accessLevel 3", () => {
    render(<ProfileDropDown user={{ ...mockUser, accessLevel: 3 }} />);

    const adminTag = screen.getByText("ADMIN");
    expect(adminTag).toBeInTheDocument();
  });
});
