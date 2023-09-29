import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignInPage from "./page"; // Import your component here
import { signIn } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({get: (_:string) => ""}),
}));


jest.mock("next-auth/react", () => ({
  signIn: jest.fn()
}))


describe("SignInPage Component", () => {
  it("renders without errors", () => {
    render(<SignInPage />);
  });

  it("handles form submission correctly", async () => {
    const { getByDisplayValue, getByTestId } = render(<SignInPage />);
    
    // Fill in the username and password fields
    const usernameInput = getByTestId("username");
    const passwordInput = getByTestId("password");
    fireEvent.change(usernameInput, { target: { value: "your_username" } });
    fireEvent.change(passwordInput, { target: { value: "your_password" } });

    // Submit the form
    const submitButton = getByDisplayValue("SIGN IN");
    fireEvent.click(submitButton);

    // You may want to assert something here, e.g., check for loading state or errors
    // Use waitFor to wait for asynchronous actions to complete if necessary
    await waitFor(() => {
      // Add your assertions here
    });
  });

  it("call the sign in function", async () => {
    const { getByTestId } = render(<SignInPage />);
    
    // Fill in incorrect username and password
    const usernameInput = getByTestId("username");
    const passwordInput = getByTestId("password");
    fireEvent.change(usernameInput, { target: { value: "dannyyuan" } });
    fireEvent.change(passwordInput, { target: { value: "Password0!" } });

    // Submit the form
    const submitButton = getByTestId("sign-in");
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {"password": "Password0!", "username": "dannyyuan"})
    });
  });

  it("handles OAuth button clicks", async () => {
    const { getByAltText } = render(<SignInPage />);
    
    // Simulate a click on the Google OAuth button
    const googleOAuthButton = getByAltText("Google Image").closest("button");
    fireEvent.click(googleOAuthButton!);

    // You can add assertions here based on the behavior of the OAuth button click
    // For example, if it opens a new window for OAuth authentication
  });

  // Add more test cases as needed
});