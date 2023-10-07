import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DashboardButton } from "./DashboardButton";

describe("DashboardButton Component", () => {
  it("renders without errors", () => {
    render(<DashboardButton currentPage="" pageTitle="example" />);
    expect(screen.getByText("EXAMPLE")).toBeInTheDocument();
  });

  it("renders the active marker when currentPage is empty", () => {
    render(<DashboardButton currentPage="" pageTitle="example" />);
    const activeMarker = screen.queryByTestId("active-element");
    expect(activeMarker).toBeInTheDocument();
  });

  it("does not render the active marker when currentPage is not empty", () => {
    render(<DashboardButton currentPage="somePage" pageTitle="example" />);
    const activeMarker = screen.queryByTestId("active-element");
    expect(activeMarker).toBeNull();
  });
});
