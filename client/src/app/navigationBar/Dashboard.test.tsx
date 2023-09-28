import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { DashboardButton } from "./DashboardButton"; // Assuming this is how you import your component

describe("DashboardButton Component", () => {
  it("renders without errors", () => {
    render(<DashboardButton currentPage="" pageTitle="example" />);
    // You can add additional assertions as needed
    expect(screen.getByText("EXAMPLE")).toBeInTheDocument(); // Replace with your expected text
  });

  it("renders the active marker when currentPage is empty", () => {
    render(<DashboardButton currentPage="" pageTitle="example" />);
    const activeMarker = screen.queryByTestId("active-element"); // Make sure you add a data-testid to your marker element
    expect(activeMarker).toBeInTheDocument();
  });

  it("does not render the active marker when currentPage is not empty", () => {
    render(<DashboardButton currentPage="somePage" pageTitle="example" />);
    const activeMarker = screen.queryByTestId("active-element"); // Using queryByTestId to check that the element is not present
    expect(activeMarker).toBeNull();
  });
});
