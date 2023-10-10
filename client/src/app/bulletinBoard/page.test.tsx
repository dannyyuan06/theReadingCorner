import { render, screen } from "@testing-library/react";
import bulletinBoard from "./page";
import "@testing-library/jest-dom";

// Mock the getMessages function
jest.mock("../../models/BulletinBoard", () => ({
  BulletinBoard: {
    getMessages: jest.fn(),
  },
}));

jest.mock("./Messages", () => ({
  Messages: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { accessLevel: 3 },
  })),
}));

jest.mock("./InputText", () => ({
  InputText: jest.fn(),
}));

describe("bulletinBoard component", () => {
  it("renders correctly", async () => {
    render(await bulletinBoard());

    const bulletinBoardTitle = screen.getByText("BULLETIN BOARD");
    expect(bulletinBoardTitle).toBeInTheDocument();
  });
});
