import "@testing-library/jest-dom";
import Members from "./page";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: null,
  }),
}));

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
      accessLevel: 1,
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
  it("should render the page correctly", async () => {
    await act(async () => {
      render(<Members />);
    });
  });
});
