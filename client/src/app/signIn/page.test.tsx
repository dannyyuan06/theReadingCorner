import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SignInPage from "./page";
import { signIn } from "next-auth/react";
import '@testing-library/jest-dom'

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({ get: (_: string) => "" }),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("SignInPage Component", () => {
  it("renders without errors", () => {
    render(<SignInPage />);

    const signInHeader = screen.getAllByText("SIGN IN");
    expect(signInHeader[0]).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    const { getByTestId } = render(<SignInPage />);
    
    const usernameInput = getByTestId("username");
    const passwordInput = getByTestId("password");
    fireEvent.change(usernameInput, { target: { value: "your_username" } });
    fireEvent.change(passwordInput, { target: { value: "your_password" } });

    const submitButton = screen.getAllByText("SIGN IN");
    fireEvent.click(submitButton[1]);
  });

  it("call the sign in function when submit button is clicked", async () => {
    const { getByTestId } = render(<SignInPage />);

    const usernameInput = getByTestId("username");
    const passwordInput = getByTestId("password");
    fireEvent.change(usernameInput, { target: { value: "dannyyuan" } });
    fireEvent.change(passwordInput, { target: { value: "Password0!" } });

    // Submit the form
    const submitButton = getByTestId("sign-in");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        password: "Password0!",
        username: "dannyyuan",
      });
    });
  });

  it("handles OAuth button clicks", async () => {
    const { getByAltText } = render(<SignInPage />);

    const googleOAuthButton = getByAltText("Google Image").closest("button");
    fireEvent.click(googleOAuthButton!);
  });
});
