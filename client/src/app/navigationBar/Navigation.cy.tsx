import { Navigation } from "./Navigation";
import { Provider } from "react-redux"; // Import your Redux Provider
import { store } from "@/redux/store";
import { mount } from "cypress/react18";
import { SessionProvider } from "next-auth/react";

describe("Navigation Component", () => {
  beforeEach(() => {
    // Mount the Navigation component with Redux Provider

    cy.intercept("/_next/pathname", { pathname: "/mocked/pathname" });
    mount(
      <Provider store={store}>
        <SessionProvider>
          <Navigation />
        </SessionProvider>
      </Provider>
    );
  });

  it("should display the logo", () => {
    // Assert that the logo is present and has the correct alt text
    cy.get('img[alt="TRC Logo"]').should("exist");
  });

  it("should display navigation buttons", () => {
    // Assert that navigation buttons are present
    cy.get(".navigation-button").should("have.length", 10); // Adjust the count as needed
  });

  it("should handle logout button click", () => {
    // Click the logout button and assert that it triggers the logout action
    cy.get(".logout-button").click();
    // You should have assertions here related to the logout behavior, like checking for a logout confirmation modal, etc.
  });

  it("should handle page navigation", () => {
    // Click on a navigation button and assert that it changes the page appropriately
    cy.get(".navigation-button").contains("Dashboard").click();
    // You should have assertions here related to the page change, e.g., checking for a different URL, etc.
  });
});