import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavigationButton } from "./NavigationButton";
import '@testing-library/jest-dom'

describe("NavigationButton Component", () => {
  it("renders without errors", () => {
    render(
      <NavigationButton
        currentPage="home"
        pageTitle="home"
        setIsLoading={() => {}}
      />
    );
    // Add appropriate assertions to check if the component renders as expected.
    expect(screen.getByText("HOME")).toBeInTheDocument(); // Replace with your expected text
  });

  it("displays the blue marker when currentPage matches pageTitle", () => {
    render(
      <NavigationButton
        currentPage="home"
        pageTitle="home"
        setIsLoading={() => {}}
      />
    );
    const blueMarker = screen.getByTestId("blue-marker");
    expect(blueMarker).toBeInTheDocument();
  });

  it("does not display the blue marker when currentPage does not match pageTitle", () => {
    render(
      <NavigationButton
        currentPage="otherPage"
        pageTitle="home"
        setIsLoading={() => {}}
      />
    );
    const blueMarker = screen.queryByTestId("blue-marker");
    expect(blueMarker).toBeNull();
  });

  it("calls setIsLoading with the correct value when Link is clicked", () => {
    const setIsLoadingMock = jest.fn();
    render(
      <NavigationButton
        currentPage="home"
        pageTitle="home"
        setIsLoading={setIsLoadingMock}
      />
    );
    const link = screen.getByText("HOME");
    fireEvent.click(link);
    expect(setIsLoadingMock).toHaveBeenCalledTimes(1);
    expect(setIsLoadingMock).toHaveBeenCalledWith(false);
  });
});