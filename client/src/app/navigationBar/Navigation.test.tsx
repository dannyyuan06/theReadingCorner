import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom'
import { Provider } from "react-redux";

// Import the component to test
import { Navigation } from "./Navigation";
import { store } from "@/redux/store";
import { useSession } from "next-auth/react";

// Mock the useSession hook
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

const mockUseSession = useSession as any

describe("Navigation Component", () => {
  it("renders navigation links when authenticated", async () => {
    mockUseSession.mockImplementation(() => ({ status: "authenticated", data: { accessLevel: 3, username: "testuser" } }))
    act(() => {
      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );
    });

    // Assert that the navigation links are rendered when authenticated
    expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
    expect(screen.getByText("PROFILE")).toBeInTheDocument();
    expect(screen.getByText("MEMBERS")).toBeInTheDocument();
    expect(screen.getByText("CLUB STATISTICS")).toBeInTheDocument();
  });

  it("renders doesn't render admin buttons when use is not admin", async () => {
    mockUseSession.mockImplementation(() => ({ status: "authenticated", data: { accessLevel: 1, username: "testuser" } }))
    act(() => {
      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );
    });

    // Assert that the navigation links are rendered when authenticated
    expect(screen.queryByText("MEMBERS")).toBeNull();
    expect(screen.queryByText("CLUB STATISTICS")).toBeNull();
  });

  it("does not render navigation links when not authenticated", async () => {
    // Mock the session to simulate unauthenticated user
    mockUseSession.mockImplementation(() => ({ status: "unauthenticated" }))


    act(() => {
      render(
        <Provider store={store}>
          <Navigation />
        </Provider>
      );
    });

    // Assert that the navigation links are not rendered when not authenticated
    expect(screen.queryByText("DASHBOARD")).toBeNull();
    expect(screen.queryByText("PROFILE")).toBeNull();
    expect(screen.queryByText("MEMBERS")).toBeNull();
    expect(screen.queryByText("CLUB STATISTICS")).toBeNull();
  });
});