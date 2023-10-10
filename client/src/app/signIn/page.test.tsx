import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SignInPage from "./page";
import { signIn } from "next-auth/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

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
    const user = userEvent.setup();
    const { getByTestId } = render(<SignInPage />);
    
    const usernameInput = getByTestId("username");
    const passwordInput = getByTestId("password");
    await user.type(usernameInput, "your_username");
    await user.type(passwordInput, "Password0!");

    const submitButton = screen.getAllByText("SIGN IN");
    await user.click(submitButton[1]);

    expect(signIn).toBeCalledTimes(1);
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

    expect(signIn).toHaveBeenCalledWith("google");
  });
});
